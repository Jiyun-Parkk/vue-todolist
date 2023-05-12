// test suit => test case들을 묶어놓은것
// describe('테스트 스위트 이름', 테이스 케이스들을 모아놓을 콜백함수)

describe('todo 관리', () => {
  // 하나의 테스트 케이스
  // it('테스트 할 동작 서술', 실제 테스트 코드 작성할 콜백함수)
  it('Todo 모달 창을 열고 닫을 수 있다.', () => {
    cy.visit('/') // 사용자가 브라우저를 통해 todos 메인 페이지에 접속
    // 모달 창 열기
    cy.contains('Add Todo').click() // add 버튼 클릭
    //모달 창 닫기(배경화면 클릭시)
    cy.get('[data-cy="modal-backdrop"]').click({ force: true })
    cy.get('[data-cy="modal-backdrop"]').should('not.exist') // 있는지 없는 확인
    cy.get('[data-cy="modal-container"]').should('not.exist') // 있는지 없는지 확인

    //모달창 닫기 close 버튼 클릭시
    //cy.get(['data-cy="newtodo-close"']).click()
    //cy.get('[data-cy="modal-container"]').should('not.exist')
  })

  // 각각의 테스트 케이스들을 수행하기 전에 동작시킬 코드
  beforeEach(() => {
    cy.visit('/')
    cy.contains('Add Todo').click()
  })

  it('새로운 Todo를 작성할 수 있다', () => {
    cy.get('#title').type('공부하기')
    cy.get('#summary').type('자바 공부하기')
    cy.get('[data-cy="modal-container"]').contains('Add').click()
    cy.get('[data-cy="modal-container"]').should('not.exist') // 있는지

    cy.contains('Add Todo').click()

    cy.get('#title').type('커피마시기')
    cy.get('#summary').type('아메리카노')
    cy.get('[data-cy="modal-container"]').contains('Add').click()
    cy.get('[data-cy="modal-container"]').should('not.exist') // 있는지 없는지확인

    cy.contains('Add Todo').click()

    cy.get('#title').type('운동하기')
    cy.get('#summary').type('스쿼트')
    cy.get('[data-cy="modal-container"]').contains('Add').click()
    cy.get('[data-cy="modal-container"]').should('not.exist') // 있는지 없는지확인

    cy.get('li').should('have.length', 3)
  })

  it('Todo를 삭제할 수 있다', () => {
    cy.get('#title').type('공부하기')
    cy.get('#summary').type('자바 공부하기')
    cy.get('[data-cy="modal-container"]').contains('Add').click()
    cy.get('[data-cy="modal-container"]').should('not.exist') // 있는지

    cy.contains('Add Todo').click()

    cy.get('#title').type('커피마시기')
    cy.get('#summary').type('아메리카노')
    cy.get('[data-cy="modal-container"]').contains('Add').click()
    cy.get('[data-cy="modal-container"]').should('not.exist') // 있는지 없는지확인

    cy.contains('Add Todo').click()

    cy.get('#title').type('운동하기')
    cy.get('#summary').type('스쿼트')
    cy.get('[data-cy="modal-container"]').contains('Add').click()
    cy.get('[data-cy="modal-container"]').should('not.exist') // 있는지 없는지확인

    cy.get('li').should('have.length', 3)

    cy.get(':nth-child(1) > :nth-child(2) > .text-red-300').click()
    cy.get('li').should('have.length', 2)
  })
  it('필터링 항목에 맞게 todo 목록들이 필터링 된다', () => {})
})

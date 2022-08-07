describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test Name',
      username: 'test',
      password: 'pass'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login').click()
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('test')
      cy.get('#password').type('pass')
      cy.get('#login-button').click()

      cy.contains('Test Name logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('test')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test', password: 'pass' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('new title')
      cy.get('#author').type('new author')
      cy.get('#url').type('new url')
      cy.get('#blog-create-button').click()

      cy.contains('new title new author')
    })

    describe('When there is blog created', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'some title', author: 'some author', url: 'newurl.com', likes: 2 })
      })

      it('A blog can be liked', function () {
        cy.contains('view').click()
        cy.contains('2 like')
        cy.contains('like').click()
        cy.contains('3 like')
      })

      it('A blog can be removed by owner', function () {
        cy.contains('view').click()
        cy.contains('remove').click()

        cy.on('window:confirm', (text) => {
          expect(text).to.contains('Remove blog some title by some author')
        })

        cy.contains('Removed some title by some author')
        cy.get('html').should('not.contain', 'view')
      })
    })

    describe('When there is multiple blogs', function () {
      beforeEach(function () {
        cy.createBlog({ title: '1some title', author: '1some author', url: '1newurl.com', likes: 2 })
        cy.createBlog({ title: '2some title', author: '2some author', url: '2newurl.com', likes: 6 })
        cy.createBlog({ title: '3some title', author: '3some author', url: '3newurl.com', likes: 23 })
        cy.createBlog({ title: '4some title', author: '4some author', url: '4newurl.com', likes: 3 })
      })

      it('Blogs are sorted based on likes', function () {
        cy.get('.blog').eq(0).should('contain', '3some title 3some author')
        cy.get('.blog').eq(1).should('contain', '2some title 2some author')
        cy.get('.blog').eq(2).should('contain', '4some title 4some author')
        cy.get('.blog').eq(3).should('contain', '1some title 1some author')
      })
    })
  })
})
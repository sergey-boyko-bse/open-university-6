Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3001/api/login', {
        username, password
    }).then(({ body }) => {
        localStorage.setItem('loggedBloglistappUser', JSON.stringify(body))
        cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
    cy.request({
        url: 'http://localhost:3001/api/blogs',
        method: 'POST',
        body: { title, author, url, likes },
        headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBloglistappUser')).token}`
        }
    })

    cy.visit('http://localhost:3000')
})

describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Test User',
            username: 'test',
            password: 'user'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.get('div').should(($div) => {
            expect($div).to.contain('Log in to application')
            expect($div).not.to.contain('blogs')
        })

        cy.get('div').find('form').should(($form) => {
            expect($form).to.contain('username')
            expect($form).to.contain('password')
            expect($form).to.contain('login')
        })
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('test')
            cy.get('#password').type('user')
            cy.get('#login-button').click()

            cy.contains('Test User logged in')
        })

        it('fails with wrong credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('test')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.contains('Wrong username or password')
            cy.get('.message').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'test', password: 'user' })
        })

        it('A blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('#title').type('A blog created by cypress')
            cy.get('#author').type('Author 1')
            cy.get('#url').type('http://test-url.com')
            cy.contains('add').click()

            cy.contains('A blog created by cypress Author 1')
        })

        it('can like a blog', function() {
            const newBlog = {
                title: 'Test blog 1',
                author: 'Author 1',
                url: 'http://test-blog-1.com'
            }
            cy.createBlog(newBlog)
            cy.visit('http://localhost:3000')

            cy.contains(newBlog.title).find('.details-button').click()
            cy.contains('likes 0')

            cy.contains(newBlog.title).find('.like-button').click()
            cy.contains('likes 1')
        })

        it('can delete a blog created by same user', function() {
            const newBlog = {
                title: 'Test blog 1',
                author: 'Author 1',
                url: 'http://test-blog-1.com'
            }
            cy.createBlog(newBlog)

            cy.visit('http://localhost:3000')
            cy.contains(newBlog.title).find('.details-button').click()
            cy.get('.blog').should('exist')

            cy.get('.remove-button').click()
            cy.contains(`${newBlog.title} deleted`)
            cy.get('.blog').should('not.exist')
        })

        it('cannot delete a blog created by another user', function() {
            const newBlog = {
                title: 'Test blog 1',
                author: 'Author 1',
                url: 'http://test-blog-1.com'
            }
            cy.createBlog(newBlog)

            const user = {
                name: 'Test User 2',
                username: 'test2',
                password: 'user2'
            }
            cy.request('POST', 'http://localhost:3001/api/users/', user)
            cy.login({ username: 'test2', password: 'user2' })

            cy.visit('http://localhost:3000')
            cy.contains(newBlog.title).find('.details-button').click()
            cy.get('.remove-button').click()

            cy.contains('failed')
            cy.get('.blog').should('exist')
        })

        it('the blogs are ordered according to likes with the blog with the most likes being first', function() {
            const newBlogs = [
                {
                    title: 'Test blog 01',
                    author: 'Author 1',
                    url: 'http://test-blog-1.com',
                    likes: 1
                },
                {
                    title: 'Test blog 02',
                    author: 'Author 2',
                    url: 'http://test-blog-2.com',
                    likes: 20
                },
                {
                    title: 'Test blog 03',
                    author: 'Author 3',
                    url: 'http://test-blog-3.com',
                    likes: 15
                }
            ]
            for(let newBlog of newBlogs) {
                cy.createBlog(newBlog)
            }

            newBlogs.sort((a, b) => b.likes - a.likes)

            cy.get('.blog').should('have.length', newBlogs.length)
                .each(($el, i) => {
                    cy.wrap($el).contains(newBlogs[i].title)
                })
        })
    })
})
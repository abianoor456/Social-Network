
var app = new Vue({

    el: '#app',
    data: {
        title: 'Feed',
        text: '',
        socket: null,
        email:'',
        password:'',
        posts: [],
        access_token: ''
    },
    methods: {
        addPost(post) {
            this.posts.push(post)
        },
        show(){
            const email= this.email;
            const password= this.password;

            console.log(email)
            console.log(password) 
        }
        ,
        async login() {
            
            const email= this.email;
            const password= this.password;

            console.log(email)
            console.log(password)

            let login = await fetch('http://localhost:3000/users/login', {
                method: 'post',
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify({ email: email, password: password }),
            });
            login = await login.json();
            this.token = login['access_token']
            console.log(`token: ${this.token}`)

            let feed = await fetch('http://localhost:3000/users/feed/?offset=0&limit=5&query=dummy', {
                method: 'get',
                headers: new Headers({
                    Authorization: 'Bearer ' + this.token,
                }),
            });
            feed = await feed.json();
            const userId = feed[1];
            const userPosts = feed[0]

            
            this.socket.emit('loggedIn', userId)

            userPosts.forEach((post) => {
                this.addPost(post);
            });


        }
    },
    async created() {
        console.log('created')

        this.socket = io('http://localhost:3000')
        this.socket.on('msgToClient', (post) => {
            console.log('post Recieved:', post)
            this.addPost(post)
        })
    }

})


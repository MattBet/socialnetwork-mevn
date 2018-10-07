<template>
    <div class="">
        <h1>Register Form</h1>
        <form class="mb-3" @submit.prevent="register">
            <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <strong>Holy guacamole!</strong> {{ error }}.
            </div>
            <div v-else-if="success" class="alert alert-success alert-dismissible fade show" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <strong>Well done!</strong> {{ success }}
            </div>
            <div class="form-group">
                <label for="firstName">firstName</label>
                <input v-model="user.firstName" type="text" class="form-control" id="firstName" required>
            </div>
            <div class="form-group">
                <label for="lastName">lastName</label>
                <input v-model="user.lastName" type="text" class="form-control" id="lastName" required>
            </div>
            <div class="form-group">
                <label for="email">email</label>
                <input v-model="user.email" type="email" class="form-control" id="email" required>
            </div>
            <div class="form-group">
                <label for="password">password</label>
                <input v-model="user.password" type="text" class="form-control" id="password" placeholder="Enter a password" required>
            </div>
            <button class="btn btn-primary" type="submit">Register</button>
        </form>
    </div>
</template>

<script>
    // @ is an alias to /src
    const API_URL = 'http://localhost:8081/auth/signup';
    export default {
        name: 'register',
        data: () => ({
            error: null,
            success: null,
            user: {
                firstName: 'Mattis',
                lastName: 'BETOURNE',
                email: 'mattis.betourne@gmail.com',
                password: 'test',
            }
        }),
        methods: {
            register() {
                console.log(this.user);
                fetch(API_URL, {
                    method: 'POST',
                    body: JSON.stringify(this.user),
                    headers: {
                        'content-type' : 'application/json'
                    }
                }).then(response => response.json()).then(result => {

                    if (result.error) {
                        console.log('result details', result.error);
                        const error = result.error;
                        this.error = error;
                    } else {
                        const success = "You successfully registered :-)";
                        this.success = success;
                        console.log('success', success);
                    }
                })
            }
        },
    };
</script>

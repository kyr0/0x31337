### Let's Hack It!

<div class="login-form">
    <h3>REGISTER</h3>
    <p>Please register with the BOUNCY CASTLE bank portal!</p>
    E-Mail: <br /><input ref="email" name="email" type="email" /><br />
    <br />
    Password: <br /><input ref="password" name="password" type="password" /><br />
    <br />
    <button onClick="registerButtonClick" ref="loginBtn">Register</button>
</div>

<script>
    Vanil.on('registerButtonClick', async() => {
        let url = 
            'http://localhost:3002/createUser?email=' + Vanil.refs.email.value + '&password=' + Vanil.refs.password.value;
        let response = await (await fetch(url)).json()
        console.log('response', response)

    })
</script>
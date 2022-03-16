### Denial-of-Service (DOS)

#### Let's face the code

<div class="dosForm">
    <code>HTTP GET /checkProductCode?code=${productCode}</code><br />
    Product code:<br />
    <input ref="productCode" value="P92348333202XXX330" />
    <br />
    <br />
    <button onClick="callProductCodeApi">fetch()</button><br />
    <br />
    Response:<br />
    <div class="console" ref="productCodeResponse"></div>
</div>

<script>
    Vanil.on('callProductCodeApi', async() => {
        startTime = Date.now();

        Vanil.refs.productCodeResponse.innerHTML = 'Loading...';

        let response = await (await fetch(`http://localhost:3002/checkProductCode?code=${Vanil.refs.productCode.value}`)).json();

        Vanil.refs.productCodeResponse.innerHTML = JSON.stringify(response, null, 2) + ' | ' +  (Date.now() - startTime) + ' ms'

    })
</script>

### Remote Code Execution (RCE)

#### Let's hack it!

<div class="dosForm">
    <code>HTTP POST /calculateFormula</code><br />
    EF's defined: EF.PAPER_PRECHAIN, EF.PAPER_ECO, also If WEBHOOK_URL is defined it is called with the calculation result.<br>
    Formula code:<br />
    <div class="code">
        <textarea rows="3" cols="50" ref="formulaeCode">20 * EF.PAPER_PRECHAIN</textarea>
    </div>
    <br />
    <br />
    <button onClick="callFormulaeApi">fetch()</button><br />
    <br />
    Response:<br />
    <div class="console" ref="formulaeApiResponse"></div>
</div>

<style>
    .code {
        align-items: center;
        display: flex;
        flex-direction: column;
    } 
</style>

<script>
    Vanil.on('callFormulaeApi', async() => {
        startTime = Date.now();

        Vanil.refs.formulaeApiResponse.innerHTML = 'Loading...';

        let response = await (await fetch(`http://localhost:3002/calculateFormula?formulaCode=${Vanil.refs.formulaeCode.value}`)).json();

        Vanil.refs.formulaeApiResponse.innerHTML = JSON.stringify(response, null, 2) + ' | ' +  (Date.now() - startTime) + ' ms'

    })
</script>

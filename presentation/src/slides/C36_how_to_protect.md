### Denial-of-Service (DOS)

#### How to mitigate

<p class="fragment fade-in">
    1. leave infra to cloud service providers (TLS;UDP;TCP;throttle/blacklist)
</p>

<p class="fragment fade-in">
    2. mind unexpected <a href="https://towardsdatascience.com/logarithms-exponents-in-complexity-analysis-b8071979e847" target="_blank">algorithmic complexity</a>
</p>

<p class="fragment fade-in">
    3. adopt circuit breaker architecture
</p>

<p class="fragment fade-in">
    4. implement fuzzy, parallel load integration tests (CI)
</p>
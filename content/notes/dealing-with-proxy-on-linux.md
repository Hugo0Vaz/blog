---
title: Gerenciadores de pacotes e proxies
toc: false
---

# APT & Squid Proxy

Quando nos encontramos atrás de um proxy o APT tem problemas em fazer *requests* se as configurações de proxy não estiverem presentes.

Para solucionar o problema basta seguir os passos:

1. crie o arquivo de configuração

```shell
sudo touch /etc/apt/apt.conf.d/proxy.conf
```

2. edite o arquivo de configuração

```shell
sudo vi /etc/apt/apt.conf.d/proxy.conf
```

3. edite a configuração específica do seu caso para os casos de `http` e `https`

```shell
Acquire::http::Proxy "http://user:password@proxy.server:port/";
Acquire::https::Proxy "http://user:password@proxy.server:port/";
```

ou

```shell
Acquire {
  HTTP::proxy "http://127.0.0.1:8080";
  HTTPS::proxy "http://127.0.0.1:8080";
}
```

<br/>
<br/>

# Zypper & Squid Proxy

Quando nos encontramos atrás de um proxy o Zypper tem problemas em fazer *requests* se as configurações de proxy não estiverem presentes.

Para solucionar o problema basta fazer:

1. Edite o arquivo: `/etc/sysconfig/proxy`.

```shell
PROXY_ENABLED="yes"
HTTP_PROXY="http://192.168.0.1:3128"
HTTPS_PROXY="http://192.168.0.1:3128"
FTP_PROXY="http://192.168.0.1:3128"
NO_PROXY="localhost, 127.0.0.1"


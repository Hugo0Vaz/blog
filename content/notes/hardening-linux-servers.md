---
title: Hardening Linux Servers
toc: false
---

# 1. Update && Upgrade dos pacotes do sistema

Faça o update e upgrade dos pacotes de acordo com a distribuição de Linux.

{{< tabs items="Debian,Ubuntu" >}}
    {{< tab >}}`apt update && apt upgrade`{{< /tab >}}
    {{< tab >}}`apt update && apt upgrade`{{< /tab >}}
{{< /tabs >}}

<br/>
<br/>
<br/>


# 2. Configurar o Hostname da máquina, com FQDN.

Configurar o *hostname* do servidor pode facilitar a configuração de outros serviços.

```shell
hostnamectl set-hostname server1.example.com

```

<br/>
<br/>
<br/>

# 3. Criar um usuário diferente de root para o login

Crie um usuário que possua privelégios `root` para que o login de `SSH` seja feito principalmente por ele.

```shell
useradd -s /bin/bash -m user
usermod -aG root user

```

<br/>
<br/>
<br/>

# 4. SSH Security

Podemos tomar algumas medidas de segurança para proteger as conexões de SSH

1. Remover acesso através de senha para o usuário `root`
2. Mudar porta de acesso `default=22` do SSH

<br/>
<br/>
<br/>

# 4. Firewall

As portas básicas que precisamos para manter um servidor ***Web*** (assumindo http e https).

1. 22 (SSH)
2. 80/tcp
3. 443/tcp
4. 8000/tcp (Coolify)

<br/>
<br/>
<br/>

# Referências

- [Linux Hostname Change](https://docs.rackspace.com/docs/linux-hostname-change)
- [Configure Hostname Linux](https://www.redhat.com/sysadmin/configure-hostname-linux)
- [Deactivating the SSH root login](https://www.ionos.com/help/server-cloud-infrastructure/getting-started/important-security-information-for-your-server/deactivating-the-ssh-root-login/)
- [How to disable ssh password login on Linux](https://www.cyberciti.biz/faq/how-to-disable-ssh-password-login-on-linux/)


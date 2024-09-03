# Setup

## Pré-requisitos:

- [Docker](https://docs.docker.com/engine/install/debian/)
- [Make](https://askubuntu.com/questions/161104/how-do-i-install-make)
- [NVM (ou node 20.9.0)](https://tecadmin.net/how-to-install-nvm-on-debian-11/)


## Instalar make e nvm no Debian

```bash
sudo apt-get update
sudo apt install curl -y
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
nvm install 20.9.0
nvm use 20.9.0
sudo apt-get -y install make
```

## Executar o projeto

Execute os comando abaixo em terminais separados:

```bash
make database
```

```bash
make backend
```

```bash
make frontend
```

Para parar os processos utilize o atalho `Ctrl+C`
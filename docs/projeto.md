---
title: Projeto de CloudWatch e CloudTrail
sidebar: true
hero: true
---

<VPDocHero
    class="VPDocHero"
    name="Cloudwatch e Cloudtrail"
    text="Monitoramento e auditoria de recursos na nuvem AWS"
    tagline="2023"
/>

## Objetivos

- Configurar duas instâncias em regiões diferentes para enviar logs para instâncias distintas do CloudWatch.
- Capturar e redirecionar as informações para o usuário por meio do CloudTrail.
- Monitorar e auditar os recursos da AWS.
- Criar gráficos e dashboards para visualizar os dados de monitoramento e auditoria.
- Criar alarmes para notificações baseadas em métricas específicas.

## Tecnologias utilizadas

- AWS (Amazon Web Services)
- CloudWatch
- CloudTrail

## Como executar o projeto

### Pré-requisitos

- Conta na AWS com acesso ao console.

### Passo a passo

1. Acesse o [console da AWS](https://console.aws.amazon.com/console/home) e faça login na sua conta.
2. Crie duas instâncias EC2 em regiões diferentes.
3. Acesse o CloudWatch e crie um grupo de logs para cada instância.
4. Acesse o CloudTrail e crie um trail para cada instância.
5. Acesse o CloudWatch e crie um dashboard para cada instância.
6. Acesse o CloudWatch e crie um alarme para cada instância.
7. Acesse o CloudTrail e visualize os logs de auditoria.

# Dashboard

### Criando instâncias EC2

Para criar as instâncias EC2, é necessário acessar o [console da AWS](https://console.aws.amazon.com/console/home) e realizar o login em sua conta. Em seguida, acesse o serviço EC2 e selecione a opção "Launch Instance", que pode estar indicada em inglês ou em português, como "Executar instância". Vale notar que por padrão a região selecionada é a `Leste dos EUA (Norte da Virgínia)`, mas é possível alterar a região no canto superior direito da tela. Para este projeto, vamos criar duas instâncias em regiões diferentes, então é importante selecionar uma região diferente para cada instância.

::: tip Dica
Para acessar o serviço EC2, é possível pesquisar por "EC2" no campo de busca do console da AWS ou navegar até a seção "Compute" e selecionar a opção "EC2".
:::

<ImgZoom src="/image/executar_instancia.png" title="Features image" alt="Features image">
    <div class="image-center">Botão de criação da instância</div>
</ImgZoom>

Ao clicar no botão de criação da instância, será aberta uma nova janela com as opções de configuração da instância. Nessa janela, é possível selecionar a imagem da máquina, o tipo de instância, o tamanho do armazenamento, a rede, as configurações de segurança, entre outras opções.

Na primeira etapa, você pode dar um nome para a instância e adicionar uma tag para identificá-la, mas elas não são obrigatórias para este tutorial. Para simplificar, não vamos utilizar essas opções e você pode escolher qualquer nome que desejar para sua instância. Eu vou chamá-la de "Instancia1".

::: warning Aviso
Não há problema em utilizar acentos no nome da instância na AWS. No entanto, é importante lembrar que alguns sistemas podem não reconhecer caracteres acentuados ou outros caracteres especiais, o que pode levar a problemas de compatibilidade. Por isso, é recomendável utilizar apenas caracteres alfanuméricos e evitar caracteres especiais ou acentos em nomes de recursos na AWS.
:::

::: details Tags na AWS
Na AWS, as tags são etiquetas que podem ser aplicadas a recursos como instâncias EC2, grupos de segurança, volumes EBS, snapshots, entre outros. Elas são compostas por um par de chave-valor e permitem categorizar e identificar facilmente seus recursos. As tags são úteis para gerenciar e filtrar recursos, especialmente em ambientes com muitos recursos e várias equipes. Além disso, as tags podem ser usadas para rastrear custos, já que a AWS fornece relatórios de custos com base nas tags atribuídas aos recursos.

Por exemplo, você pode adicionar uma tag "Ambiente" com o valor "Produção" para indicar que uma instância está em produção. Você pode adicionar outras tags, como "Projeto" ou "Departamento" com valores correspondentes. Essas tags ajudam a organizar seus recursos em categorias específicas e a facilitar a identificação e gerenciamento deles. Além disso, você pode usar tags para fins de faturamento, gerenciamento de custos e monitoramento.
:::

Na segunda aba, você pode escolher a imagem da máquina, que pode ser uma imagem da AWS ou personalizada. Neste projeto, vamos usar a imagem "Ubuntu Server 22.04 LTS (HVM), SSD Volume Type", que é fornecida pela AWS.

::: details Imagem de máquina na AWS
Uma AMI (Amazon Machine Image) é um modelo pré-configurado que contém informações necessárias para criar uma instância EC2 na Amazon AWS. A imagem pode incluir um sistema operacional, aplicativos, bibliotecas, configurações e dados do usuário. Ao usar uma AMI, é possível iniciar uma instância EC2 com a configuração salva na imagem, sem precisar configurar tudo do zero. As AMIs podem ser criadas a partir de uma instância existente, importadas ou encontradas publicamente no AWS Marketplace. Ao utilizar as AMIs, os usuários economizam tempo e esforço na configuração e personalização de instâncias EC2, além de permitir a padronização de ambientes, facilitando a manutenção e escalabilidade dos recursos em nuvem.
:::

Na terceira aba, você pode escolher o tipo de instância, que define a capacidade de processamento, memória e armazenamento da instância. Neste projeto, vamos utilizar a instância "t2.medium", que é uma instância de baixo custo e baixa capacidade de processamento, mas que é suficiente para nossos testes.

::: warning Aviso
Antes de prosseguir, é importante considerar o tipo de instância mais apropriado para a sua aplicação na AWS. Há diversos tipos de instâncias disponíveis, cada uma com um custo diferente, portanto, é essencial avaliar as necessidades da sua aplicação e escolher o tipo de instância mais adequado para obter o melhor desempenho e economia.
:::

::: tip Dica
Sempre é possível alterar o tipo de instância posteriormente, mas é importante lembrar que a alteração pode exigir a reinicialização da instância, o que pode causar interrupções no serviço. Além disso, a alteração do tipo de instância pode alterar o custo da instância, já que cada tipo de instância tem um custo diferente.
:::

Na quarta aba, você deve escolher um par de chaves para acessar a instância. Para isso, você pode criar um novo par de chaves ou selecionar um par de chaves existente. Neste projeto, vamos criar um novo par de chaves chamado "Chave1".

Para criar um novo par de chaves, siga esses simples passos. Clique no botão **Criar par de chaves** e uma nova aba será aberta. Digite um nome para o par de chaves e clique novamente no botão **Criar par de chaves**. O arquivo `.pem` será baixado para o seu computador, contendo a chave privada do par de chaves. Essa chave é necessária para acessar a instância via SSH.


<ImgZoom src="/image/par_chaves.png" title="Par de chaves"  alt="Par de chaves">
    <div class="image-center">Criação do Par de chaves</div>
</ImgZoom>

::: details Chaves de acesso na AWS
As chaves de acesso são pares de chaves criptográficas que permitem acessar instâncias EC2 na AWS. Elas são compostas por uma chave pública e uma chave privada. A chave pública é usada para criptografar dados e a chave privada é usada para descriptografar dados. As chaves de acesso são usadas para autenticar o acesso às instâncias EC2 e são necessárias para acessar as instâncias via SSH. As chaves de acesso são gerenciadas pelo serviço EC2 e podem ser criadas, importadas, exportadas e excluídas por meio do 
console da AWS ou da API da AWS.
:::

::: details SSH
SSH é um protocolo de rede seguro que permite acessar remotamente um computador ou servidor de forma segura e criptografada. Com o SSH, é possível enviar comandos e transferir arquivos de forma segura entre dois dispositivos conectados à internet. É amplamente utilizado por administradores de sistemas e desenvolvedores para gerenciar e acessar servidores remotos.
:::

Na quinta aba, você pode fazer a configuração de rede da instância. Neste projeto, vamos deixar as configurações padrão.

Na sexta aba, você pode adicionar armazenamento à instância. Neste projeto, vamos mudar para 30GB. Nas abas restantes não será necessário fazer nenhuma alteração, portanto, você pode clicar no botão **Executar instância**.

Oficialmente, a instância está sendo criada. E quando terminar de ser criada, você verá a seguinte tela:

<ImgZoom src="/image/criacao_instancia.png" title="Instância criada" alt="Instância criada">
    <div class="image-center">Instância criada</div>
</ImgZoom>

Ao clicar no botão **Visualizar todas as instâncias**, você será redirecionado para a página de instâncias, onde poderá ver a instância que acabou de criar.

<ImgZoom src="/image/instancias.png" title="Instâncias"  alt="Instâncias">
    <div class="image-center">Conjuto de todas as instâncias criadas em uma região</div>
</ImgZoom>

Nessa página, você pode visualizar todas as instâncias que estão sendo executadas na sua conta AWS. As informações incluem o nome da instância, o tipo de instância, o estado atual, o endereço IP público e privado, a zona de disponibilidade, o VPC, o grupo de segurança, o nome do par de chaves, o proprietário, o AMI usado para criar a instância, o tipo de armazenamento raiz, o tamanho do armazenamento, o status do monitoramento, o status de otimização EBS, o status de verificação de status e o status de verificação de sistema. Essas informações são úteis para gerenciar e monitorar suas instâncias em tempo real, permitindo que você tome decisões informadas sobre seu ambiente de nuvem.

Com a primeira instância criada e em execução, vamos criar uma segunda instância, porém para esse projeto temos que criá-la em uma outra região da AWS. Para isso, clique no menu suspenso no canto superior direito da página e selecione a região `Leste dos EUA (Ohio)`, ou em qualquer outra região que você preferir.

Nessa nova Região da AWS, vamos criar uma nova instância. Para isso, clique no botão **Executar instância** e siga os mesmos passos que você seguiu para criar a primeira instância. Porém, nessa nova instância, vamos usar o nome `Instancia2` e o par de chaves `Chave2`.

::: danger Perigo
Você pode criar uma instância com o mesmo par de chaves, porém é recomendado criar um par de chaves exclusivo para cada instância criada na AWS. Isso porque cada par de chaves é único e específico para uma determinada instância. Utilizar o mesmo par de chaves para múltiplas instâncias pode tornar a infraestrutura vulnerável a ataques cibernéticos, pois se um invasor obtiver acesso a uma chave privada, ele poderá acessar todas as instâncias que usam essa chave. Além disso, utilizar chaves exclusivas para cada instância torna mais fácil a gestão de acesso e a identificação de eventuais problemas de segurança.
:::

::: warning Aviso
Você provavelmente irá notar que ao trocar de região tudo que você já tinha feito foi "apagado". Isso acontece porque cada região da AWS é independente e não compartilha recursos com outras regiões. Portanto, é necessário criar tudo novamente em cada região que você deseja utilizar. Mas não se preocupe, a sua instância da região `Leste dos EUA (Norte da Virgínia)` ainda está lá, basta você voltar para essa região para visualizá-la.
:::

### Acessando as instâncias

Agora que temos duas instâncias criadas, vamos acessá-las via SSH. Para isso, selecione a instância `Instancia1`. Ao selecionala informações sobre a instância serão exibidas na parte inferior da página. Como o endereço IP público da instância e o nome do par de chaves, que serão necessários para acessar a instância via SSH. Porém, para facilitar o acesso a AWS disponibiliza um botão **Conectar** que ao ser clicado exibe um comando que pode ser executado no terminal para acessar a instância via SSH.

Ao clicar nele será exibida uma janela com os comandos que devem ser executados no terminal para acessar a instância via SSH.

<ImgZoom src="/image/comandos_ssh.png" title="Comandos do ssh" alt="Comandos do ssh">
    <div class="image-center">Aba de comandos para acessar a instância via SSH</div>
</ImgZoom>

O primeiro comando:

```bash
chmod 400 <caminho para o par de chaves>
```

É necessário para alterar as permissões do par de chaves, pois o SSH não permite que chaves com permissões de leitura e gravação para o grupo e outros usuários sejam usadas para acessar uma instância. Portanto, é necessário alterar as permissões do par de chaves para que apenas o proprietário possa ler e gravar no arquivo. Para isso, copie o comando e cole no terminal. Em seguida, substitua `<caminho para o par de chaves>` pelo caminho para o par de chaves que você baixou anteriormente. o comando ficará assim:

::: warning Aviso
A chave tem que está no mesmo diretório que o terminal está apontando. Caso contrário, você terá que navegar até o diretório onde a chave está localizada.
:::


```bash
chmod 400 Chave1.pem
```

O segundo comando:

```bash
ssh -i "<caminho para o par de chaves>" ubuntu@<endereço IP público da instância>
```

É necessário para acessar a instância via SSH. Para isso, copie o comando e cole no terminal. Em seguida, substitua `<caminho para o par de chaves>` pelo caminho para o par de chaves que você baixou anteriormente e substitua `<endereço IP público da instância>` pelo endereço IP público da instância que você deseja acessar. Por exemplo, se o endereço IP público da instância é `54.152.78.225`, o comando ficará assim:

```bash
ssh -i "Chave1.pem" ubuntu@54.152.78.225
```

Ao executar o comando, você será questionado se deseja continuar a conexão, digite `yes` e pressione `Enter`. Em seguida, você será conectado à instância via SSH.

Pronto! Agora você está conectado à instância via SSH. Para sair da instância, digite `exit` e pressione `Enter`.

Antes de prosseguir, vamos instalar o Apache na instância para que possamos utilizar como uma aplicação simples que consumirá um pouco de recurso e assim possamos monitorar através do CloudWatch. Para isso, execute os seguintes comandos:

```bash
sudo apt update
sudo apt install apache2 -y
```

Mas e se eu quiser acessar a outra instância? Basta repetir o mesmo processo, porém com o par de chaves e o endereço IP público da outra instância. Agora baixe o apache na outra instância e teste o acesso a ela via SSH.

### Conectando o CloudWatch com a instância

Agora que temos duas instâncias criadas e acessíveis via SSH, vamos conectar o CloudWatch com as instâncias para que possamos monitorar o consumo de recursos das instâncias.

Para isso, acesse o cloudwatch, para acessar essa ferramenta, basta digitar `cloudwatch` na barra de pesquisa da AWS e clicar no resultado que aparecerá a seguinte página.

::: warning Aviso
Lembre-se de que é importante ter as permissões corretas na sua conta da AWS para acessar o CloudWatch. Se você não tiver as permissões apropriadas, não poderá usar a ferramenta. Caso precise configurar as permissões, solicite ajuda a um administrador da conta da AWS.
:::

::: tip Dica
Para as métricas que iremos monitorar, não é necessário que o agente do CloudWatch agent esteja instalado na instância. Porém, para métricas mais específicas, como por exemplo, métricas de disco, é necessário que o agente do CloudWatch esteja instalado na instância.
:::

<ImgZoom src="/image/aba_cloudwatch.png" title="Comandos do CloudWatch" alt="Comandos do CloudWatch">
    <div class="image-center">Aba de criação e configuração do CloudWatch</div>
</ImgZoom>

Nela você pode criar e configurar os recursos do CloudWatch. Para criar um recurso, basta clicar no botão **Criar alarme**. Ao clicar nele será exibida uma janela com as opções de recursos que podem ser criados. Para criar um painel de monitoramento de instâncias, selecione a opção **Selecionar métrica**.

<ImgZoom src="/image/aba_metrica.png" title="Aba metrica"  alt="aba metrica">
    <div class="image-center">Aba de criação da métrica</div>
</ImgZoom>

Ao clicar nessa opção, será exibida uma janela com as opções de métricas que podem ser monitoradas. Vamos configurar a métrica para monitorar o CPU, portanto selecione a opção **EC2**, em seguida, selecione a opção **Métricas por instância** e por fim, selecione ou pesquise a opção **CPUCreditBalance** e clique em **Selecionar métrica**.

::: details CPUCreditBalance
CPUCreditBalance na AWS é uma medida de quantos créditos de CPU uma instância possui disponíveis para uso. Esses créditos são usados para aumentar a capacidade da instância temporariamente e ajudam a evitar a diminuição da performance. Quando a instância usa mais créditos do que possui disponível, a performance é reduzida.
:::

Isso abrirar uma nova janela com as opções de configuração da métrica. Nessa janela, você pode configurar o nome do painel, a frequência de atualização, o período de tempo que será exibido no painel, etc. Na primeira aba você irar conseguir por um nome ao seu alarme e em seguida o **InstanceId** da instância que você deseja monitorar é muito importante que você se certifique de que o **InstanceId** está correto, pois caso contrário, você estará monitorando a métrica de outra instância. Em estatística e em período vamos deixar o padrão que está, ou seja, **Média** e **5 minutos**. 

::: tip Dica
Você pode encontrar o **InstanceId** da instância que você deseja monitorar acessando o serviço EC2, selecionando a instância e copiando o **InstanceId** que está na aba **Descrição**.
:::

Na outra aba **Condições** é aonde vamos configurar o gatilho para mandar um alarme caso o consumo de CPU da instância ultrapasse um determinado valor. Para isso, vamos configurar o alarme para enviar um alarme caso o consumo de CPU da instância ultrapasse 80% por 5 minutos. Para isso, em **Definir um limite** selecione a opção **Maior/igual** e em seguida digite **80** e em seguida clique em **Próximo**.

Nessa parte você pode configurar o que será feito caso o alarme seja acionado. Para isso, deixe na opção **Em alarme** e selecione a opção **Criar um novo tópico** e em seguida digite um nome para o tópico e um email para receber o alarme. Em seguida clique em **Criar tópico** e depois em **Próximo**.

::: tip Dica
Ao criar um tópico você receberar um e-mail de confirmação, para confirmar o tópico, basta clicar no link que estará no e-mail. Caso não confirme o tópico, você não receberá os alarmes.
:::

Na próxima aba, você pode configurar o nome do alarme e uma descrição para ele que será exibida no e-mail que você receberá. Em seguida clique em **Próximo**. Na última aba, você pode revisar as configurações do alarme e em seguida clicar em **Criar alarme**.

Agora que o alarme foi criado, você pode acessar o serviço CloudWatch e clicar na opção **Alarmes** no menu lateral esquerdo. Nessa página você poderá ver todos os alarmes que você criou. Para ver os detalhes de um alarme, basta clicar no nome dele. Ao clicar no nome do alarme, você será redirecionado para uma página com os detalhes do alarme. Nessa página você poderá ver o gráfico com o consumo de CPU da instância e o status do alarme. Caso o consumo de CPU da instância ultrapasse 80% por 5 minutos, você receberá um e-mail com o alarme.

Para testar o alarme, você pode acessar a instância e executar um comando que consuma muito CPU, como por exemplo, o comando **stress**. Para instalar o **stress** na instância, execute o comando abaixo:

```bash
sudo apt-get install stress
```

Após a instalação, execute o comando abaixo para consumir 100% da CPU da instância:

```bash
stress --cpu 2 --timeout 1200
```

Após executar o comando, você pode acessar o serviço CloudWatch e verificar que o consumo de CPU da instância ultrapassou 80% por 5 minutos, ao ultrapassar esse valor você irá notar que aparecerá um alarme na página de alarmes do CloudWatch e você receberá um e-mail com o alarme.

<ImgZoom src="/image/alarme_ativo.png" title="Símbolo alarme" alt="simbolo alarme">
    <div class="image-center">Símbolo com o alarme ativado</div>
</ImgZoom>

O email que você receberá será parecido com o email abaixo:

<ImgZoom src="/image/email_alarme.png" title="email alarme" alt="email alarme">
    <div class="image-center">Email com o alarme</div>
</ImgZoom>

Agora que você já sabe como criar um alarme, você pode criar alarmes para monitorar outros recursos da AWS, como por exemplo, o consumo de memória da instância, o consumo de armazenamento da instância, o consumo de CPU do banco de dados, o consumo de memória do banco de dados, etc.

Nesse projeto iremos utilizar as seguintes métricas do CloudWatch:

- **CPUCreditBalance**: Métrica que mostra quantos créditos de CPU uma instância possui disponíveis para uso. Esses créditos são usados para aumentar a capacidade da instância temporariamente e ajudam a evitar a diminuição da performance. Quando a instância usa mais créditos do que possui disponível, a performance é reduzida.

- **CPUCreditUsage**: Métrica que mostra quantos créditos de CPU uma instância está usando.

- **CPUUtilization**: Métrica que mostra o uso de CPU da instância.

- **DiskReadBytes**: Métrica que mostra a quantidade de bytes lidos do disco da instância.

- **DiskReadOps**: Métrica que mostra a quantidade de operações de leitura do disco da instância.

- **DiskWriteBytes**: Métrica que mostra a quantidade de bytes escritos no disco da instância.

- **NetworkIn**: Métrica que mostra a quantidade de bytes recebidos pela instância.

- **NetworkOut**: Métrica que mostra a quantidade de bytes enviados pela instância.

Agora que você ja sabe criar alarmes para monitorar os recursos da AWS, você pode criar esses mesmos alarmes para a outra instância que você criou em uma outra região.

### Configurando o CloudTrail

Para configurar o CloudTrail, acesse o serviço CloudTrail e clique na opção **Criar trilha**. Na página que abrir, digite um nome para a trilha e em seguida clique em **Próximo**. Na próxima página, você pode selecionar as opções que deseja monitorar. Para esse projeto, selecione a opção **Todos os eventos de leitura de dados** e em seguida clique em **Próximo**. Na próxima página, você pode selecionar o destino dos logs. Para esse projeto, selecione a opção **Enviar logs para o CloudWatch Logs** e em seguida clique em **Próximo**. Na próxima página, você pode selecionar as opções de criptografia dos logs. Para esse projeto, deixe a opção **Não criptografar** e em seguida clique em **Próximo**. Na próxima página, você pode selecionar as opções de gerenciamento de acesso. Para esse projeto, deixe a opção **Criar uma nova função** e em seguida clique em **Próximo**. Na próxima página, você pode selecionar as opções de tags. Para esse projeto, deixe a opção **Não adicionar tags** e em seguida clique em **Próximo**. Na próxima página, você pode revisar as configurações da trilha e em seguida clique em **Criar trilha**.

Agora que a trilha foi criada, você pode acessar o serviço CloudTrail e clicar na opção **Trilhas** no menu lateral esquerdo. Nessa página você poderá ver todas as trilhas que você criou. Para ver os detalhes de uma trilha, basta clicar no nome dela. Ao clicar no nome da trilha, você será redirecionado para uma página com os detalhes da trilha. Nessa página você poderá ver o status da trilha e o destino dos logs.

Para testar a trilha, você pode acessar a instância e executar um comando que leia um arquivo, como por exemplo, o comando **cat**. Após executar o comando, você pode acessar o serviço CloudTrail e verificar que o comando foi registrado nos logs.



# Estruturando com o Terraform

Terraform é uma ferramenta de infraestrutura como código (IaC) criada pela HashiCorp. Ela permite que você gerencie sua infraestrutura como código, o que significa que você pode definir, implantar e atualizar sua infraestrutura usando arquivos de configuração declarativos. Esses arquivos descrevem a configuração da infraestrutura necessária para executar seus aplicativos, incluindo servidores, redes, balanceadores de carga, bancos de dados e outros recursos em nuvem.

O Terraform suporta uma grande variedade de provedores de nuvem, incluindo **Amazon Web Services**, **Microsoft Azure**, **Google Cloud Platform** e muitos outros. Além disso, o Terraform é uma ferramenta multiplataforma e pode ser usado em sistemas operacionais como `Linux`, `macOS` e `Windows`.

O Terraform usa uma linguagem de configuração simples e intuitiva, que permite descrever a infraestrutura necessária para executar seus aplicativos de maneira repetível e consistente. Ao usar o Terraform, você pode versionar sua infraestrutura, colaborar com outros membros da equipe e implantar suas alterações de forma segura e previsível.

## Instalando o Terraform

Para instalar o Terraform em diferentes sistemas operacionais, você pode usar os seguintes comandos:

**Ubuntu/Debian**

```bash
wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg
gpg --no-default-keyring --keyring /usr/share/keyrings/hashicorp-archive-keyring.gpg --fingerprint
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform
```

**CentOS/RHEL**

```bash
sudo yum install -y yum-utils
sudo rpm --import https://rpm.releases.hashicorp.com/RPM-GPG-KEY-hashicorp-2022
sudo yum-config-manager --add-repo https://rpm.releases.hashicorp.com/RHEL/hashicorp.repo
sudo yum -y install terraform
```

**Windows/FreeBSD/OpenBSD/Solaris**

Visite a [página de download do Terraform](https://www.terraform.io/downloads.html) para obter o instalador adequado para seu sistema operacional.

**macOS**

```bash
brew install terraform
```

Você pode verificar se a instalação foi bem sucedida executando o comando abaixo:

```bash
terraform
```

Se a instalação foi bem-sucedida, você deve ver uma lista de comandos e opções disponíveis.

## Configurando o Terraform

Para configurar o Terraform, antes você precisa baixar o `AWS CLI` e configurar suas credenciais de acesso. Para instalar o `AWS CLI` em diferentes sistemas operaci´onais, você pode usar os seguintes comandos:

**Ubuntu/Debian**

```bash
sudo apt install awscli
```

**CentOS/RHEL**

```bash
sudo yum install -y awscli
```

**Windows/FreeBSD/OpenBSD/Solaris**

Visite a [página de download do AWS CLI](https://aws.amazon.com/pt/cli/) para obter o instalador adequado para seu sistema operacional.

**macOS**

```bash
brew install awscli
```

Para configurar suas credenciais de acesso, você pode executar o comando abaixo:

```bash
aws configure
```

Você será solicitado a fornecer suas credenciais de acesso. Você pode obtê-las na página de [credenciais de segurança da AWS](https://console.aws.amazon.com/iam/home?#/security_credentials).

::: tip Dica
Caso você não tenha uma chave de acesso, você pode criar uma clicando no botão `Criar nova chave de acesso`. Ele te dará uma chave de acesso e uma chave de acesso secreta. Você pode usar essas credenciais para configurar o AWS CLI.
:::

O comando irá solicitar que você forneça as seguintes informações:

- **AWS Access Key ID**: A chave de acesso que você obteve na página de credenciais de segurança da AWS.
- **AWS Secret Access Key ID**: A chave de acesso secreta que você obteve na página de credenciais de segurança da AWS.
- **Default region name**: A região padrão que você deseja usar. Por exemplo, `us-east-1`.
- **Default output format**: O formato de saída padrão que você deseja usar. Por exemplo, `json`.

O comando acima criará um arquivo chamado `~/.aws/credentials` em seu sistema. Você pode verificar se o arquivo foi criado executando o comando abaixo:

```bash
cat ~/.aws/credentials
```

Depois de configurar suas credenciais de acesso, você pode configurar o Terraform. Para isso, vamos criar um diretório chamado `terraform` e dentro dele vamos criar os seguintes arquivos:

- `provider.tf` - Arquivo de configuração do provedor.
- `ec2.tf` - Arquivo de configuração da instância EC2.
- `cloudwatch.tf` - Arquivo de configuração do alarme do CloudWatch.

::: tip Dica
Caso você utiliza o vscode, você pode instalar a extensão [HashiCorp Terraform](https://marketplace.visualstudio.com/items?itemName=HashiCorp.terraform) para ter suporte a sintaxe do Terraform.
:::

::: tip Dica
Os nomes dos arquivos não são importantes, mas é uma boa prática nomeá-los de acordo com o recurso que eles definem. Por exemplo, `ec2.tf` define um recurso EC2.
:::

Detro do arquivo `provider.tf`, você pode adicionar o seguinte código:

```bash
provider "aws" {
  region  = "us-east-1"
}
```

Ele define o provedor AWS a ser usado para criar os recursos. O `region` especifica a região da AWS onde a instância EC2 será criada. Neste exemplo, a instância EC2 será criada na região `US East (N. Virginia)`.

No arquivo `ec2.tf`, você pode adicionar o seguinte código:

```bash
resource "aws_instance" "app_server" {
  ami           = "ami-007855ac798b5175e"
  instance_type = "t2.medium"
  key_name      = <"Chave .pem">

  tags = {
    Name = "InstanciaTerraform"
  }
}

resource "aws_security_group" "security" {
  name        = "security"
  description = "Security Group"

  ingress {
    description = "HTTPS"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }  
}
```

Nesse código ele define o recurso a ser criado. No exemplo, é definido um recurso do tipo `aws_instance`, que cria uma instância `EC2`.

O `ami` especifica a AMI (Amazon Machine Image) a ser usada para criar a instância. Neste exemplo, a AMI é **Ubuntu Server 22.04 LTS (HVM), SSD Volume Type**.

O `instance_type` especifica o tipo de instância EC2 a ser criado. Neste exemplo, uma instância do tipo `t2.medium` será criada.

O bloco `tags` define tags personalizadas a serem adicionadas à instância EC2. Neste exemplo, apenas uma tag `Name` é definida para a instância EC2 com o valor `"InstanciaTerraform"`.

O `key_name` especifica o nome da chave SSH a ser usada para se conectar à instância EC2. Lembre-se de que você precisa criar uma chave SSH antes de criar a instância EC2, como foi explicado na seção anterior. No meu caso eu teria que substituir por `key_name = "Chave1"`, que foi o nome da chave que criei na seção anterior.

O bloco `resource` define um recurso a ser criado. No exemplo, é definido um recurso do tipo `aws_security_group`, que cria um grupo de segurança. O grupo de segurança é usado para controlar o tráfego de entrada e saída da instância EC2. O grupo de segurança criado neste exemplo permite o tráfego de entrada na porta `22` (SSH).

::: tip Dica
Caso você não tenha uma chave SSH, você pode acessar o [AWS Console](https://console.aws.amazon.com/ec2/v2/home?#KeyPairs:sort=keyName) e criar uma clicando no botão `Criar par de chaves`. Ele te dará uma chave SSH que você pode usar para se conectar à instância EC2.
:::

Pronto apenas com esses dois arquivos você já pode criar uma instância EC2. Para isso, você precisa executar o seguinte comando:

```bash
terraform init
```

O comando acima baixará o provedor AWS da HashiCorp e inicializará o diretório de trabalho do Terraform.

Depois de inicializar o diretório de trabalho do Terraform, você pode executar o seguinte comando para ver o plano de implantação:

```bash
terraform plan
```

O comando acima permite analisar o que o Terraform vai fazer com a sua infraestrutura antes de realmente fazê-lo. Ele mostra um resumo das alterações que serão feitas, permitindo que você revise e verifique se está tudo correto antes de aplicar as mudanças. É uma maneira segura de evitar erros e garantir que a sua infraestrutura está sendo gerenciada da maneira desejada.

Para aplicar as alterações, você precisa executar o seguinte comando:

```bash
terraform apply
```

O último comando aplica as mudanças no código Terraform à infraestrutura da nuvem, criando, modificando ou excluindo recursos na AWS.

::: warning Aviso
O comando acima irá solicitar que você confirme a aplicação das alterações. Para confirmar, digite `yes` e pressione `Enter`.
:::

Se tudo ocorreu bem, você irá conseguir visualizar a instância EC2 criada no console da AWS.

<ImgZoom src="/image/instance_terraform.png" title="Instance Terraform" alt="Instance Terraform">
    <div class="image-center">Instância criada pelo terraform</div>
</ImgZoom>

Para destruir a instância EC2 criada, você precisa executar o seguinte comando:

```bash
terraform destroy
```

O comando acima irá destruir a instância EC2 criada. Para recriar a instância basta seguir os passos anteriores.

### Conectando o CloudWatch com o Terraform

Para conectar o CloudWatch e criar um alarme `CPUUtilization` com o Terraform que enviará um e-mail caso um gatilho definido seja acionado, você precisa adicionar o seguinte código ao arquivo `ec2.tf`:


```bash
resource "aws_instance" "app_server" {
  ami           = "ami-007855ac798b5175e"
  instance_type = "t2.medium"
  key_name      = <"Chave .pem">

  tags = {
    Name = "InstanciaTerraform"
  }
}

resource "aws_sns_topic" "sns_topic" {
  name = "my_sns_topic"
}

resource "aws_sns_topic_subscription" "sns_topic_subscription" {
  topic_arn = aws_sns_topic.sns_topic.arn
  protocol  = "email"
  endpoint  = <"EMAIL A SER SUBSTITUÍDO">
}
```

O código acima cria um tópico SNS e uma assinatura de tópico SNS. O tópico SNS é usado para enviar notificações por e-mail quando um alarme do CloudWatch é acionado. A assinatura do tópico SNS especifica o endereço de e-mail para o qual as notificações serão enviadas. Lembre-se de substituir o valor do parâmetro `endpoint` pelo seu endereço de e-mail.

::: warning Aviso
Lembrando que você irá receber um e-mail para confirmar a assinatura do tópico SNS. Para confirmar, basta .image-centerclicar no link enviado para o seu e-mail.
:::


Agora, você pode adicionar o seguinte código ao arquivo `cloudwatch.tf`:

```bash
# Configura o CloudWatch para monitorar a utilização da CPU da instância EC2
resource "aws_cloudwatch_metric_alarm" "ec2_cpu_alarm" {
  alarm_name          = "CPU Utilization Alarm"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "1"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = "300"
  statistic           = "Average"
  threshold           = "70"
  alarm_description   = "This metric monitors EC2 CPU utilization."
  insufficient_data_actions = []

  dimensions = {
    InstanceId = aws_instance.app_server.id
  }

  alarm_actions = [
    aws_sns_topic.sns_topic.arn
  ]
}
```

O código acima cria um alarme do CloudWatch que monitora a utilização da CPU da instância EC2. O alarme é acionado quando a utilização da CPU é maior ou igual a 70% por 1 período de avaliação de 5 minutos. Quando o alarme é acionado, ele envia uma notificação por e-mail para o endereço de e-mail especificado na assinatura do tópico SNS.

Para testar você pode entrar no console da AWS e aumentar a utilização da CPU da instância EC2, como foi explicado anteriormente. Quando a utilização da CPU atingir 70%, você receberá um e-mail informando que o alarme foi acionado.

Para adicionar os outros alarmes, você precisa adicionar o seguinte código ao arquivo `cloudwatch.tf`:

```bash
# Configura o CloudWatch para monitorar a utilização da CPU da instância EC2
resource "aws_cloudwatch_metric_alarm" "ec2_cpu_alarm" {
  alarm_name          = "CPU Utilization Alarm"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "1"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = "300"
  statistic           = "Average"
  threshold           = "70"
  alarm_description   = "This metric monitors EC2 CPU utilization."
  insufficient_data_actions = []

  dimensions = {
    InstanceId = aws_instance.app_server.id
  }

  alarm_actions = [
    aws_sns_topic.sns_topic.arn
  ]
}

# Configura o CloudWatch para monitorar o crédito de CPU da instância EC2
resource "aws_cloudwatch_metric_alarm" "ec2_cpu_credit_balance_alarm" {
    alarm_name = "CPU Credit Balance Alarm"
    comparison_operator = "LessThanOrEqualToThreshold"
    evaluation_periods = "1"
    metric_name = "CPUCreditBalance"
    namespace = "AWS/EC2"
    period = "300"
    statistic = "Minimum"
    threshold = "10"
    alarm_description = "This metric monitors the CPU credit balance of the EC2 instance."
    insufficient_data_actions = []

    dimensions = {
        InstanceId = aws_instance.app_server.id
    }

    alarm_actions = [
        aws_sns_topic.sns_topic.arn
    ]
}

# Configura o CloudWatch para monitorar o uso de crédito de CPU da instância EC2
resource "aws_cloudwatch_metric_alarm" "ec2_cpu_credit_usage_alarm" {
alarm_name = "CPU Credit Usage Alarm"
comparison_operator = "GreaterThanThreshold"
evaluation_periods = "1"
metric_name = "CPUCreditUsage"
namespace = "AWS/EC2"
period = "300"
statistic = "Maximum"
threshold = "80"
alarm_description = "This metric monitors the CPU credit usage of the EC2 instance."
insufficient_data_actions = []

    dimensions = {
        InstanceId = aws_instance.app_server.id
    }

    alarm_actions = [
        aws_sns_topic.sns_topic.arn
    ]
}

# Configura o CloudWatch para monitorar o status de verificação da instância EC2
resource "aws_cloudwatch_metric_alarm" "ec2_disk_read_bytes_alarm" {
    alarm_name = "Disk Read Bytes Alarm"
    comparison_operator = "GreaterThanThreshold"
    evaluation_periods = "1"
    metric_name = "DiskReadBytes"
    namespace = "AWS/EC2"
    period = "300"
    statistic = "Sum"
    threshold = "100000000"
    alarm_description = "This metric monitors the disk read bytes of the EC2 instance."
    insufficient_data_actions = []

    dimensions = {
        InstanceId = aws_instance.app_server.id
    }

    alarm_actions = [
        aws_sns_topic.sns_topic.arn
    ]
}

# Configura o CloudWatch para monitorar o status de verificação da instância EC2
resource "aws_cloudwatch_metric_alarm" "ec2_disk_read_ops_alarm" {
    alarm_name = "Disk Read Operations Alarm"
    comparison_operator = "GreaterThanThreshold"
    evaluation_periods = "1"
    metric_name = "DiskReadOps"
    namespace = "AWS/EC2"
    period = "300"
    statistic = "Sum"
    threshold = "100"
    alarm_description = "This metric monitors the disk read operations of the EC2 instance."
    insufficient_data_actions = []

    dimensions = {
        InstanceId = aws_instance.app_server.id
    }

    alarm_actions = [
        aws_sns_topic.sns_topic.arn
    ]
}

# Configura o CloudWatch para monitorar a escrita em disco da instância EC2
resource "aws_cloudwatch_metric_alarm" "ec2_disk_write_bytes_alarm" {
  alarm_name          = "Disk Write Bytes Alarm"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "1"
  metric_name         = "DiskWriteBytes"
  namespace           = "AWS/EC2"
  period              = "300"
  statistic           = "Sum"
  threshold           = "1048576" # 1MB/s
  alarm_description   = "This metric monitors EC2 disk write bytes."
  insufficient_data_actions = []

  dimensions = {
    InstanceId = aws_instance.app_server.id
  }

  alarm_actions = [
    aws_sns_topic.sns_topic.arn
  ]
}

# Configura o CloudWatch para monitorar o tráfego de entrada na instância EC2
resource "aws_cloudwatch_metric_alarm" "ec2_network_in_alarm" {
  alarm_name          = "Network In Alarm"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "1"
  metric_name         = "NetworkIn"
  namespace           = "AWS/EC2"
  period              = "300"
  statistic           = "Sum"
  threshold           = "1048576" # 1MB/s
  alarm_description   = "This metric monitors EC2 network in traffic."
  insufficient_data_actions = []

  dimensions = {
    InstanceId = aws_instance.app_server.id
  }

  alarm_actions = [
    aws_sns_topic.sns_topic.arn
  ]
}

# Configura o CloudWatch para monitorar o tráfego de saída na instância EC2
resource "aws_cloudwatch_metric_alarm" "ec2_network_out_alarm" {
  alarm_name          = "Network Out Alarm"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "1"
  metric_name         = "NetworkOut"
  namespace           = "AWS/EC2"
  period              = "300"
  statistic           = "Sum"
  threshold           = "1048576" # 1MB/s
  alarm_description   = "This metric monitors EC2 network out traffic."
  insufficient_data_actions = []

  dimensions = {
    InstanceId = aws_instance.app_server.id
  }

  alarm_actions = [
    aws_sns_topic.sns_topic.arn
  ]
}
```

### Configurando a segunda instância EC2

Do mesmo modo que foi feito com a primeira instância EC2, é necessário criar um `provider` para identificar cada região da AWS e criar um arquivo chamado `ec2` para configurar qual tipo de S.O (Sistema Operacional), potência da máquina entre outros parâmetros que a nova instância vai adquirir.

Por tanto, detro do arquivo `provider.tf` adicione o seguinte código:

```bash
provider "aws" {
  alias = "east-2"
  region  = "us-east-2"
}
```

Dessa forma o arquivo deve ficar da seguinte forma:

```bash
provider "aws" {
  region  = "us-east-1"
}

provider "aws" {
  alias = "east-2"
  region  = "us-east-2"
}
```

Como já foi explicado antes a opção `region` é para identificar a região da AWS, e a opção `alias` é para identificar o nome da região, para futuras configurações no Terraform.

Agora no arquivo `ec2.tf` adicione o seguinte código:

```bash
resource "aws_instance" "app_server_east_2" {
  provider      = aws.east-2
  ami           = "ami-0a695f0d95cefc163"
  instance_type = "t2.medium"
  key_name      = "Chave2"

  tags = {
    Name = "InstanciaTerraform_2"
  }
}
```

Dessa forma o arquivo deve ficar da seguinte forma:

```bash
resource "aws_instance" "app_server" {
  ami           = "ami-007855ac798b5175e"
  instance_type = "t2.medium"
  key_name      = "Chave1"

  tags = {
    Name = "InstanciaTerraform_1"
  }
}

resource "aws_instance" "app_server_east_2" {
  provider      = aws.east-2
  ami           = "ami-0a695f0d95cefc163"
  instance_type = "t2.medium"
  key_name      = "Chave2"

  tags = {
    Name = "InstanciaTerraform_2"
  }
}

resource "aws_security_group" "security" {
  name        = "security"
  description = "Security Group"

  ingress {
    description = "HTTPS"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }  
}

resource "aws_sns_topic" "sns_topic" {
  name = "my_sns_topic"
}

resource "aws_sns_topic_subscription" "sns_topic_subscription" {
  topic_arn = aws_sns_topic.sns_topic.arn
  protocol  = "email"
  endpoint  = "pedroa3@al.insper.edu.br"
}
```

Note que diferentemente da primeira instância EC2, a segunda instância EC2 está sendo criada na região `us-east-2`, pois adicionamos a variável `provider` referencindo o **alias** criado anteriormente e o nome da chave é `Chave2`, a qual foi criada na região `us-east-2`. Perceba também que o `ami` é diferente, pois cada região da AWS possui um `ami` diferente, mesmo que seja o mesmo S.O.

Agora para configurar o CloudWatch para monitorar o tráfego de entrada e saída da segunda instância EC2, é necessário adicionar no arquivo chamado `cloudwatch.tf`:

```bash
# Configurando o CloudWatch para monitorar a utilização de memória da instância EC2 da região us-east-2
resource "aws_cloudwatch_metric_alarm" "ec2_cpu_alarm_east_2" {
  alarm_name          = "CPU Utilization Alarm East 2"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "1"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = "300"
  statistic           = "Average"
  threshold           = "70"
  alarm_description   = "This metric monitors EC2 CPU utilization in us-east-2."
  insufficient_data_actions = []

  dimensions = {
    InstanceId = aws_instance.app_server_east_2.id
  }

  alarm_actions = [
    aws_sns_topic.sns_topic.arn
  ]
}

# Configura o CloudWatch para monitorar o crédito de CPU da instância EC2
resource "aws_cloudwatch_metric_alarm" "ec2_cpu_credit_balance_alarm_east_2" {
    alarm_name = "CPU Credit Balance Alarm East 2"
    comparison_operator = "LessThanOrEqualToThreshold"
    evaluation_periods = "1"
    metric_name = "CPUCreditBalance"
    namespace = "AWS/EC2"
    period = "300"
    statistic = "Minimum"
    threshold = "10"
    alarm_description = "This metric monitors the CPU credit balance of the EC2 instance in us-east-2."
    insufficient_data_actions = []

    dimensions = {
        InstanceId = aws_instance.app_server_east_2.id
    }

    alarm_actions = [
        aws_sns_topic.sns_topic.arn
    ]
}

# Configura o CloudWatch para monitorar o uso de crédito de CPU da instância EC2
resource "aws_cloudwatch_metric_alarm" "ec2_cpu_credit_usage_alarm_east_2" {
alarm_name = "CPU Credit Usage Alarm East 2"
comparison_operator = "GreaterThanThreshold"
evaluation_periods = "1"
metric_name = "CPUCreditUsage"
namespace = "AWS/EC2"
period = "300"
statistic = "Maximum"
threshold = "80"
alarm_description = "This metric monitors the CPU credit usage of the EC2 instance in us-east-2."
insufficient_data_actions = []

    dimensions = {
        InstanceId = aws_instance.app_server_east_2.id
    }

    alarm_actions = [
        aws_sns_topic.sns_topic.arn
    ]
}

# Configura o CloudWatch para monitorar o status de verificação da instância EC2
resource "aws_cloudwatch_metric_alarm" "ec2_disk_read_bytes_alarm_east_2" {
    alarm_name = "Disk Read Bytes Alarm East 2"
    comparison_operator = "GreaterThanThreshold"
    evaluation_periods = "1"
    metric_name = "DiskReadBytes"
    namespace = "AWS/EC2"
    period = "300"
    statistic = "Sum"
    threshold = "100000000"
    alarm_description = "This metric monitors the disk read bytes of the EC2 instance in us-east-2."
    insufficient_data_actions = []

    dimensions = {
        InstanceId = aws_instance.app_server_east_2.id
    }

    alarm_actions = [
        aws_sns_topic.sns_topic.arn
    ]
}

# Configura o CloudWatch para monitorar o status de verificação da instância EC2
resource "aws_cloudwatch_metric_alarm" "ec2_disk_read_ops_alarm_east_2" {
    alarm_name = "Disk Read Operations Alarm East 2"
    comparison_operator = "GreaterThanThreshold"
    evaluation_periods = "1"
    metric_name = "DiskReadOps"
    namespace = "AWS/EC2"
    period = "300"
    statistic = "Sum"
    threshold = "100"
    alarm_description = "This metric monitors the disk read operations of the EC2 instance in us-east-2."
    insufficient_data_actions = []

    dimensions = {
        InstanceId = aws_instance.app_server_east_2.id
    }

    alarm_actions = [
        aws_sns_topic.sns_topic.arn
    ]
}

# Configura o CloudWatch para monitorar a escrita em disco da instância EC2
resource "aws_cloudwatch_metric_alarm" "ec2_disk_write_bytes_alarm_east_2" {
  alarm_name          = "Disk Write Bytes Alarm East 2"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "1"
  metric_name         = "DiskWriteBytes"
  namespace           = "AWS/EC2"
  period              = "300"
  statistic           = "Sum"
  threshold           = "1048576" # 1MB/s
  alarm_description   = "This metric monitors EC2 disk write bytes in us-east-2."
  insufficient_data_actions = []

  dimensions = {
    InstanceId = aws_instance.app_server_east_2.id
  }

  alarm_actions = [
    aws_sns_topic.sns_topic.arn
  ]
}

# Configura o CloudWatch para monitorar o tráfego de entrada na instância EC2
resource "aws_cloudwatch_metric_alarm" "ec2_network_in_alarm_east_2" {
  alarm_name          = "Network In Alarm East 2"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "1"
  metric_name         = "NetworkIn"
  namespace           = "AWS/EC2"
  period              = "300"
  statistic           = "Sum"
  threshold           = "1048576" # 1MB/s
  alarm_description   = "This metric monitors EC2 network in traffic in us-east-2."
  insufficient_data_actions = []

  dimensions = {
    InstanceId = aws_instance.app_server_east_2.id
  }

  alarm_actions = [
    aws_sns_topic.sns_topic.arn
  ]
}

# Configura o CloudWatch para monitorar o tráfego de saída na instância EC2
resource "aws_cloudwatch_metric_alarm" "ec2_network_out_alarm_east_2" {
  alarm_name          = "Network Out Alarm East 2"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "1"
  metric_name         = "NetworkOut"
  namespace           = "AWS/EC2"
  period              = "300"
  statistic           = "Sum"
  threshold           = "1048576" # 1MB/s
  alarm_description   = "This metric monitors EC2 network out traffic in us-east-2."
  insufficient_data_actions = []

  dimensions = {
    InstanceId = aws_instance.app_server_east_2.id
  }

  alarm_actions = [
    aws_sns_topic.sns_topic.arn
  ]
}
```

Dessa forma o arquivo completo deve ficar assim:

```bash
# Configura o CloudWatch para monitorar a utilização da CPU da instância EC2
resource "aws_cloudwatch_metric_alarm" "ec2_cpu_alarm" {
  alarm_name          = "CPU Utilization Alarm"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "1"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = "300"
  statistic           = "Average"
  threshold           = "70"
  alarm_description   = "This metric monitors EC2 CPU utilization."
  insufficient_data_actions = []

  dimensions = {
    InstanceId = aws_instance.app_server.id
  }

  alarm_actions = [
    aws_sns_topic.sns_topic.arn
  ]
}

# Configura o CloudWatch para monitorar o crédito de CPU da instância EC2
resource "aws_cloudwatch_metric_alarm" "ec2_cpu_credit_balance_alarm" {
    alarm_name = "CPU Credit Balance Alarm"
    comparison_operator = "LessThanOrEqualToThreshold"
    evaluation_periods = "1"
    metric_name = "CPUCreditBalance"
    namespace = "AWS/EC2"
    period = "300"
    statistic = "Minimum"
    threshold = "10"
    alarm_description = "This metric monitors the CPU credit balance of the EC2 instance."
    insufficient_data_actions = []

    dimensions = {
        InstanceId = aws_instance.app_server.id
    }

    alarm_actions = [
        aws_sns_topic.sns_topic.arn
    ]
}

# Configura o CloudWatch para monitorar o uso de crédito de CPU da instância EC2
resource "aws_cloudwatch_metric_alarm" "ec2_cpu_credit_usage_alarm" {
alarm_name = "CPU Credit Usage Alarm"
comparison_operator = "GreaterThanThreshold"
evaluation_periods = "1"
metric_name = "CPUCreditUsage"
namespace = "AWS/EC2"
period = "300"
statistic = "Maximum"
threshold = "80"
alarm_description = "This metric monitors the CPU credit usage of the EC2 instance."
insufficient_data_actions = []

    dimensions = {
        InstanceId = aws_instance.app_server.id
    }

    alarm_actions = [
        aws_sns_topic.sns_topic.arn
    ]
}

# Configura o CloudWatch para monitorar o status de verificação da instância EC2
resource "aws_cloudwatch_metric_alarm" "ec2_disk_read_bytes_alarm" {
    alarm_name = "Disk Read Bytes Alarm"
    comparison_operator = "GreaterThanThreshold"
    evaluation_periods = "1"
    metric_name = "DiskReadBytes"
    namespace = "AWS/EC2"
    period = "300"
    statistic = "Sum"
    threshold = "100000000"
    alarm_description = "This metric monitors the disk read bytes of the EC2 instance."
    insufficient_data_actions = []

    dimensions = {
        InstanceId = aws_instance.app_server.id
    }

    alarm_actions = [
        aws_sns_topic.sns_topic.arn
    ]
}

# Configura o CloudWatch para monitorar o status de verificação da instância EC2
resource "aws_cloudwatch_metric_alarm" "ec2_disk_read_ops_alarm" {
    alarm_name = "Disk Read Operations Alarm"
    comparison_operator = "GreaterThanThreshold"
    evaluation_periods = "1"
    metric_name = "DiskReadOps"
    namespace = "AWS/EC2"
    period = "300"
    statistic = "Sum"
    threshold = "100"
    alarm_description = "This metric monitors the disk read operations of the EC2 instance."
    insufficient_data_actions = []

    dimensions = {
        InstanceId = aws_instance.app_server.id
    }

    alarm_actions = [
        aws_sns_topic.sns_topic.arn
    ]
}

# Configura o CloudWatch para monitorar a escrita em disco da instância EC2
resource "aws_cloudwatch_metric_alarm" "ec2_disk_write_bytes_alarm" {
  alarm_name          = "Disk Write Bytes Alarm"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "1"
  metric_name         = "DiskWriteBytes"
  namespace           = "AWS/EC2"
  period              = "300"
  statistic           = "Sum"
  threshold           = "1048576" # 1MB/s
  alarm_description   = "This metric monitors EC2 disk write bytes."
  insufficient_data_actions = []

  dimensions = {
    InstanceId = aws_instance.app_server.id
  }

  alarm_actions = [
    aws_sns_topic.sns_topic.arn
  ]
}

# Configura o CloudWatch para monitorar o tráfego de entrada na instância EC2
resource "aws_cloudwatch_metric_alarm" "ec2_network_in_alarm" {
  alarm_name          = "Network In Alarm"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "1"
  metric_name         = "NetworkIn"
  namespace           = "AWS/EC2"
  period              = "300"
  statistic           = "Sum"
  threshold           = "1048576" # 1MB/s
  alarm_description   = "This metric monitors EC2 network in traffic."
  insufficient_data_actions = []

  dimensions = {
    InstanceId = aws_instance.app_server.id
  }

  alarm_actions = [
    aws_sns_topic.sns_topic.arn
  ]
}

# Configura o CloudWatch para monitorar o tráfego de saída na instância EC2
resource "aws_cloudwatch_metric_alarm" "ec2_network_out_alarm" {
  alarm_name          = "Network Out Alarm"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "1"
  metric_name         = "NetworkOut"
  namespace           = "AWS/EC2"
  period              = "300"
  statistic           = "Sum"
  threshold           = "1048576" # 1MB/s
  alarm_description   = "This metric monitors EC2 network out traffic."
  insufficient_data_actions = []

  dimensions = {
    InstanceId = aws_instance.app_server.id
  }

  alarm_actions = [
    aws_sns_topic.sns_topic.arn
  ]
}

###########################################################################################

# Configurando o CloudWatch para monitorar a utilização de memória da instância EC2 da região us-east-2
resource "aws_cloudwatch_metric_alarm" "ec2_cpu_alarm_east_2" {
  alarm_name          = "CPU Utilization Alarm East 2"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "1"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = "300"
  statistic           = "Average"
  threshold           = "70"
  alarm_description   = "This metric monitors EC2 CPU utilization in us-east-2."
  insufficient_data_actions = []

  dimensions = {
    InstanceId = aws_instance.app_server_east_2.id
  }

  alarm_actions = [
    aws_sns_topic.sns_topic.arn
  ]
}

# Configura o CloudWatch para monitorar o crédito de CPU da instância EC2
resource "aws_cloudwatch_metric_alarm" "ec2_cpu_credit_balance_alarm_east_2" {
    alarm_name = "CPU Credit Balance Alarm East 2"
    comparison_operator = "LessThanOrEqualToThreshold"
    evaluation_periods = "1"
    metric_name = "CPUCreditBalance"
    namespace = "AWS/EC2"
    period = "300"
    statistic = "Minimum"
    threshold = "10"
    alarm_description = "This metric monitors the CPU credit balance of the EC2 instance in us-east-2."
    insufficient_data_actions = []

    dimensions = {
        InstanceId = aws_instance.app_server_east_2.id
    }

    alarm_actions = [
        aws_sns_topic.sns_topic.arn
    ]
}

# Configura o CloudWatch para monitorar o uso de crédito de CPU da instância EC2
resource "aws_cloudwatch_metric_alarm" "ec2_cpu_credit_usage_alarm_east_2" {
alarm_name = "CPU Credit Usage Alarm East 2"
comparison_operator = "GreaterThanThreshold"
evaluation_periods = "1"
metric_name = "CPUCreditUsage"
namespace = "AWS/EC2"
period = "300"
statistic = "Maximum"
threshold = "80"
alarm_description = "This metric monitors the CPU credit usage of the EC2 instance in us-east-2."
insufficient_data_actions = []

    dimensions = {
        InstanceId = aws_instance.app_server_east_2.id
    }

    alarm_actions = [
        aws_sns_topic.sns_topic.arn
    ]
}

# Configura o CloudWatch para monitorar o status de verificação da instância EC2
resource "aws_cloudwatch_metric_alarm" "ec2_disk_read_bytes_alarm_east_2" {
    alarm_name = "Disk Read Bytes Alarm East 2"
    comparison_operator = "GreaterThanThreshold"
    evaluation_periods = "1"
    metric_name = "DiskReadBytes"
    namespace = "AWS/EC2"
    period = "300"
    statistic = "Sum"
    threshold = "100000000"
    alarm_description = "This metric monitors the disk read bytes of the EC2 instance in us-east-2."
    insufficient_data_actions = []

    dimensions = {
        InstanceId = aws_instance.app_server_east_2.id
    }

    alarm_actions = [
        aws_sns_topic.sns_topic.arn
    ]
}

# Configura o CloudWatch para monitorar o status de verificação da instância EC2
resource "aws_cloudwatch_metric_alarm" "ec2_disk_read_ops_alarm_east_2" {
    alarm_name = "Disk Read Operations Alarm East 2"
    comparison_operator = "GreaterThanThreshold"
    evaluation_periods = "1"
    metric_name = "DiskReadOps"
    namespace = "AWS/EC2"
    period = "300"
    statistic = "Sum"
    threshold = "100"
    alarm_description = "This metric monitors the disk read operations of the EC2 instance in us-east-2."
    insufficient_data_actions = []

    dimensions = {
        InstanceId = aws_instance.app_server_east_2.id
    }

    alarm_actions = [
        aws_sns_topic.sns_topic.arn
    ]
}

# Configura o CloudWatch para monitorar a escrita em disco da instância EC2
resource "aws_cloudwatch_metric_alarm" "ec2_disk_write_bytes_alarm_east_2" {
  alarm_name          = "Disk Write Bytes Alarm East 2"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "1"
  metric_name         = "DiskWriteBytes"
  namespace           = "AWS/EC2"
  period              = "300"
  statistic           = "Sum"
  threshold           = "1048576" # 1MB/s
  alarm_description   = "This metric monitors EC2 disk write bytes in us-east-2."
  insufficient_data_actions = []

  dimensions = {
    InstanceId = aws_instance.app_server_east_2.id
  }

  alarm_actions = [
    aws_sns_topic.sns_topic.arn
  ]
}

# Configura o CloudWatch para monitorar o tráfego de entrada na instância EC2
resource "aws_cloudwatch_metric_alarm" "ec2_network_in_alarm_east_2" {
  alarm_name          = "Network In Alarm East 2"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "1"
  metric_name         = "NetworkIn"
  namespace           = "AWS/EC2"
  period              = "300"
  statistic           = "Sum"
  threshold           = "1048576" # 1MB/s
  alarm_description   = "This metric monitors EC2 network in traffic in us-east-2."
  insufficient_data_actions = []

  dimensions = {
    InstanceId = aws_instance.app_server_east_2.id
  }

  alarm_actions = [
    aws_sns_topic.sns_topic.arn
  ]
}

# Configura o CloudWatch para monitorar o tráfego de saída na instância EC2
resource "aws_cloudwatch_metric_alarm" "ec2_network_out_alarm_east_2" {
  alarm_name          = "Network Out Alarm East 2"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "1"
  metric_name         = "NetworkOut"
  namespace           = "AWS/EC2"
  period              = "300"
  statistic           = "Sum"
  threshold           = "1048576" # 1MB/s
  alarm_description   = "This metric monitors EC2 network out traffic in us-east-2."
  insufficient_data_actions = []

  dimensions = {
    InstanceId = aws_instance.app_server_east_2.id
  }

  alarm_actions = [
    aws_sns_topic.sns_topic.arn
  ]
}
```

Note que os alarmes são configurados para serem as mesmas métricas que foram configurados no da primeira região, porém isso não é obrigatório, você pode configurar as métricas que desejar. Porém os nomes dos alarmes devem ser únicos, ou seja, não podem ser iguais aos alarmes da primeira região. Além disso, em `InstanceID` deve ser adicionado o ID da instância EC2 que foi criada na segunda região.

### Configurando o CloudTrail

Como o CloudTrail é um serviço global da AWS, não é necessário configurar um CloudTrail para cada região. Para isso, basta configurar o CloudTrail em uma região e ele irá monitorar todas as regiões da AWS.

Como funciona o CloudTrail? O CloudTrail monitora todas as ações que são feitas na sua conta da AWS, como por exemplo, criação de instâncias EC2, criação de buckets S3, criação de alarmes no CloudWatch, etc. Ele armazena essas informações em um bucket S3 e você pode acessar esses logs para verificar o que foi feito na sua conta da AWS. A partir desses logs, você pode criar alarmes personalizados no CloudWatch para monitorar as ações que são feitas na sua conta da AWS, ou, para o nosso caso, monitorar os logs de uma ou mais instâncias EC2 e criar alarmes que não são possíveis de serem criados pelo CloudWatch.

A configuração do CloudTrail é feita através do Terraform, onde é criado um bucket S3 para armazenar os logs do CloudTrail e uma política de acesso para o CloudTrail. Para isso é necessário criar um arquivo chamado `cloudtrail.tf` e adicionar o seguinte código:

::: details bucket S3
O bucket S3 da AWS é um serviço de armazenamento na nuvem para armazenar e gerenciar arquivos e objetos. Ele fornece escalabilidade, durabilidade, segurança e integração com outros serviços da AWS. É usado para armazenar e acessar dados de forma confiável e flexível.
:::

```bash
data "aws_caller_identity" "current" {}

resource "aws_cloudtrail" "foobar" {
  name                          = "teste-terraform-123456789"
  s3_bucket_name                = aws_s3_bucket.foo.id
  s3_key_prefix                 = "prefix"
  include_global_service_events = false
}

resource "aws_s3_bucket" "foo" {
  bucket        = "teste-terraform-123456789"
  force_destroy = true
}

data "aws_iam_policy_document" "foo" {
  statement {
    sid    = "AWSCloudTrailAclCheck"
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["cloudtrail.amazonaws.com"]
    }

    actions   = ["s3:GetBucketAcl"]
    resources = [aws_s3_bucket.foo.arn]
  }

  statement {
    sid    = "AWSCloudTrailWrite"
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["cloudtrail.amazonaws.com"]
    }

    actions   = ["s3:PutObject"]
    resources = ["${aws_s3_bucket.foo.arn}/prefix/AWSLogs/${data.aws_caller_identity.current.account_id}/*"]

    condition {
      test     = "StringEquals"
      variable = "s3:x-amz-acl"
      values   = ["bucket-owner-full-control"]
    }
  }
}
resource "aws_s3_bucket_policy" "foo" {
  bucket = aws_s3_bucket.foo.id
  policy = data.aws_iam_policy_document.foo.json
}
```

Esse código cria um bucket S3, define uma política que permite que o CloudTrail acesse e escreva objetos no bucket e associa essa política ao bucket. Isso permite que o CloudTrail armazene registros de eventos em um bucket S3 especificado.

::: warning Aviso
Caso der algum erro ao executar o comando `terraform apply` para criar o CloudTrail, execute o comando `terraform destroy` para destruir o CloudTrail e altere o nome do bucket S3 no arquivo `cloudtrail.tf` para um nome que ainda não foi utilizado.
:::

Agora precisamos configurar para o CloudWatch logs receber os logs do CloudTrail. Para isso adicione o seguinte código no arquivo `cloudtrail.tf`:

```bash
resource "aws_cloudwatch_log_group" "cloudtrail_logs" {
  name = "/aws/instances/InstanciaTerraform_1"
  retention_in_days = null
}
```

Este código cria um grupo de logs no CloudWatch para armazenar os logs do CloudTrail. Certifique-se de que o nome do grupo de logs seja único, pois ele não pode ser alterado após a criação. O parâmetro `retention_in_days` define por quantos dias os logs serão armazenados no CloudWatch. Se o valor for definido como `null`, os logs serão armazenados indefinidamente. Caso tivesse sido definido o valor `7` por exemplo, os logs seriam armazenados por 7 dias.

Agora precisamos criar a regra do evento que irá enviar os logs do CloudTrail para o CloudWatch. Para isso adicione o seguinte código no arquivo `cloudtrail.tf`:

```bash
resource "aws_cloudwatch_event_rule" "cloudtrail_event_rule" {
  name        = "InstanciaTerraform_1Rule"
  description = "Event rule for InstanciaTerraform_1"
  event_pattern = jsonencode({
    source      = ["aws.ec2"]
    detail_type = ["EC2 Instance State-change Notification"]
    detail      = {
      state = ["running"]
      instance-id = [
        "${aws_instance.app_server.id}",
        "${aws_instance.app_server_east_2.id}"]
    }
  })
}
```

Este código cria uma regra de evento no CloudWatch que captura eventos específicos do CloudTrail relacionados à instância EC2 em execução. O nome e a descrição podem ser personalizados conforme necessário. Certifique-se de que os detalhes, como a origem e o tipo de detalhe, estejam corretos para atender aos seus requisitos. O parâmetro `event_pattern` define o filtro de evento que será usado para capturar os eventos do CloudTrail. Neste caso, o filtro captura eventos de alteração de estado da instância EC2 necessáriamente em execução, pois o estado da instância é definido como `running` na aba `state`. Note que o filtro de evento também captura eventos de alteração de estado de instâncias EC2 em execução em outras regiões, pois o parâmetro `instance-id` está definido com o valor `${aws_instance.app_server_east_2.id}` que é o ID da instância EC2 em execução na região `us-east-2`.

Agora precisamos criar o alvo do evento que irá enviar os logs do CloudTrail para o CloudWatch. Para isso adicione o seguinte código no arquivo `cloudtrail.tf`:

```bash
resource "aws_cloudwatch_event_target" "cloudwatch_event_target" {
  rule      = aws_cloudwatch_event_rule.cloudtrail_event_rule.name
  arn       = aws_cloudwatch_log_group.cloudtrail_logs.arn
  target_id = "s3-destination"
}
```

Neste trecho de código, estamos configurando o destino do evento no CloudWatch para a regra de evento específica chamada cloudtrail_event_rule. O destino do evento é definido usando o recurso aws_cloudwatch_event_target.

`rule` é definido como o nome da regra de evento `aws_cloudwatch_event_rule.cloudtrail_event_rule.name`, que deve ser definida anteriormente. Essa regra de evento capturará os eventos específicos que desejamos monitorar.
`arn` é definido como o **ARN** (Amazon Resource Name) do grupo de logs do `CloudWatch aws_cloudwatch_log_group.cloudtrail_logs.arn`. Essa é a localização onde os eventos capturados serão enviados.
No `target_id` é definido como **"s3-destination"**. Isso é um identificador único para o destino do evento.

Essa configuração garante que os eventos capturados pela regra de evento sejam enviados para o grupo de logs do CloudWatch especificado.

Agora precisamos criar o filtro métrico para que possamos utilizar todos os dados coletados para criar algum alarme costumizado. Para isso adicione o seguinte código no arquivo `cloudtrail.tf`:

```bash
resource "aws_cloudwatch_log_metric_filter" "cloudtrail_metric_filter" {
  name           = "cloudtrail-metric-filter"
  pattern        = "{$.eventName = \"StopInstances\"}"
  log_group_name = aws_cloudwatch_log_group.cloudtrail_logs.name

  metric_transformation {
    name          = "StopInstancesCount"
    namespace     = "Custom/CloudTrail"
    value         = "1"
    default_value = "0"
  }
}
```

Aqui estamos definindo um filtro métrico para os logs do CloudWatch usando o recurso `aws_cloudwatch_log_metric_filter`. Esse filtro nos permite extrair métricas específicas dos logs para fins de monitoramento ou análise.

`name` foi definido como **"cloudtrail-metric-filter"**. Isso é apenas um nome descritivo para o filtro métrico.
`pattern` é definido como **"{$.eventName = "StopInstances"}"**. Esse é o padrão que usamos para filtrar os eventos específicos que desejamos monitorar. Neste caso, estamos filtrando eventos com o campo **"eventName"** igual a **"StopInstances"**, ou seja, eventos de parada de instâncias.
`log_group_name` foi definido como `aws_cloudwatch_log_group.cloudtrail_logs.name`, que deve ser o nome do grupo de logs do CloudWatch onde os eventos estão sendo enviados.
Dentro do recurso `aws_cloudwatch_log_metric_filter`, temos o bloco `metric_transformation`, onde definimos a transformação métrica para o filtro.

`name` é definido como **"StopInstancesCount"**. Esse é o nome da métrica que será extraída dos logs.
`namespace` é definido como **"Custom/CloudTrail"**. Isso define o namespace no qual a métrica será criada no CloudWatch.
`value` foi definido como **"1"**. Esse é o valor que será atribuído à métrica sempre que o evento filtrado for encontrado.
`default_value` é definido como **"0"**. Esse é o valor padrão da métrica caso nenhum evento correspondente seja encontrado.

E finalmente podemos criar o alarme para monitorar a métrica criada. Para isso adicione o seguinte código no arquivo `cloudtrail.tf`:

::: tip Dica
Provavelmente o mais correto é adicionar o alarme no arquivo `cloudwatch.tf`, mas para fins didáticos e deixar claro que é um alarme feito pelo cloudtrail, vamos deixar tudo no mesmo arquivo.
:::

```bash
resource "aws_cloudwatch_metric_alarm" "cloudtrail_alarm" {
  alarm_name          = "cloudtrail-stop-instances-alarm"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "1"
  metric_name         = "StopInstancesCount"
  namespace           = "Custom/CloudTrail"
  period              = "60"
  statistic           = "SampleCount"
  threshold           = "1"

  alarm_description = "CloudTrail Stop Instances Alarm"
  
  alarm_actions     = [
    aws_sns_topic.sns_topic.arn
    ]
}
```

No código passado, estamos configurando um alarme métrico no CloudWatch usando o recurso `aws_cloudwatch_metric_alarm`. Esse alarme será acionado quando certas condições métricas forem atendidas.

`alarm_name` é definido como **"cloudtrail-stop-instances-alarm"**. Este é o nome do alarme métrico.
`comparison_operator` é definido como **"GreaterThanOrEqualToThreshold"**. Isso indica a comparação que será feita entre o valor da métrica e o limiar definido.
`evaluation_periods` é definido como **"1"**. Isso especifica quantos períodos de avaliação consecutivos devem atender à condição para que o alarme seja acionado.
`metric_name` é definido como **"StopInstancesCount"**. Este é o nome da métrica na qual o alarme será baseado.
`namespace` é definido como **"Custom/CloudTrail"**. Isso define o namespace em que a métrica está localizada no CloudWatch.
`period` é definido como **"60"**. Isso define o período em segundos em que os dados da métrica são coletados.
`statistic` é definido como **"SampleCount"**. Isso especifica a estatística que será usada para avaliar a métrica.
`threshold` é definido como **"1"**. Este é o valor do limiar que a métrica precisa atingir ou exceder para acionar o alarme.
Além desses parâmetros, temos algumas outras configurações opcionais:

`alarm_description` é definido como **"CloudTrail Stop Instances Alarm"**. Esta é uma descrição opcional para o alarme métrico.
`alarm_actions` é definido como **[aws_sns_topic.sns_topic.arn]**. Isso define as ações que serão executadas quando o alarme for acionado. Neste caso, está configurado para acionar um tópico SNS específico.

Por tanto, esse código configura um alarme métrico no CloudWatch que será acionado quando a métrica **"StopInstancesCount"** atingir ou exceder o limiar de **1**.

Dessa forma o arquivo `cloudtrail.tf` deve estar assim:

```bash
data "aws_caller_identity" "current" {}

resource "aws_cloudtrail" "foobar" {
  name                          = "teste-terraform-123456789"
  s3_bucket_name                = aws_s3_bucket.foo.id
  s3_key_prefix                 = "prefix"
  include_global_service_events = false
}

resource "aws_s3_bucket" "foo" {
  bucket        = "teste-terraform-123456789"
  force_destroy = true
}

data "aws_iam_policy_document" "foo" {
  statement {
    sid    = "AWSCloudTrailAclCheck"
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["cloudtrail.amazonaws.com"]
    }

    actions   = ["s3:GetBucketAcl"]
    resources = [aws_s3_bucket.foo.arn]
  }

  statement {
    sid    = "AWSCloudTrailWrite"
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["cloudtrail.amazonaws.com"]
    }

    actions   = ["s3:PutObject"]
    resources = ["${aws_s3_bucket.foo.arn}/prefix/AWSLogs/${data.aws_caller_identity.current.account_id}/*"]

    condition {
      test     = "StringEquals"
      variable = "s3:x-amz-acl"
      values   = ["bucket-owner-full-control"]
    }
  }
}
resource "aws_s3_bucket_policy" "foo" {
  bucket = aws_s3_bucket.foo.id
  policy = data.aws_iam_policy_document.foo.json
}

resource "aws_cloudwatch_log_group" "cloudtrail_logs" {
  name = "/aws/instances/InstanciaTerraform_1"
  retention_in_days = null
}

resource "aws_cloudwatch_event_rule" "cloudtrail_event_rule" {
  name        = "InstanciaTerraform_1Rule"
  description = "Event rule for InstanciaTerraform_1"
  event_pattern = jsonencode({
    source      = ["aws.ec2"]
    detail_type = ["EC2 Instance State-change Notification"]
    detail      = {
      state = ["running"]
      instance-id = [
        "${aws_instance.app_server.id}",
        "${aws_instance.app_server_east_2.id}"]
    }
  })
}

resource "aws_cloudwatch_event_target" "cloudwatch_event_target" {
  rule      = aws_cloudwatch_event_rule.cloudtrail_event_rule.name
  arn       = aws_cloudwatch_log_group.cloudtrail_logs.arn
  target_id = "s3-destination"
}

resource "aws_cloudwatch_log_metric_filter" "cloudtrail_metric_filter" {
  name           = "cloudtrail-metric-filter"
  pattern        = "{$.eventName = \"StopInstances\"}"
  log_group_name = aws_cloudwatch_log_group.cloudtrail_logs.name

  metric_transformation {
    name          = "StopInstancesCount"
    namespace     = "Custom/CloudTrail"
    value         = "1"
    default_value = "0"
  }
}

resource "aws_cloudwatch_metric_alarm" "cloudtrail_alarm" {
  alarm_name          = "cloudtrail-stop-instances-alarm"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "1"
  metric_name         = "StopInstancesCount"
  namespace           = "Custom/CloudTrail"
  period              = "60"
  statistic           = "SampleCount"
  threshold           = "1"

  alarm_description = "CloudTrail Stop Instances Alarm"

  alarm_actions     = [
    aws_sns_topic.sns_topic.arn
    ]
}
```

Com isso, temos um alarme configurado no CloudWatch que será acionado quando a métrica **StopInstancesCount** atingir ou exceder o limiar de 1. Quando o alarme for acionado, ele enviará uma mensagem para o tópico SNS que criamos anteriormente.

## Referências

- [CloudWatch](https://aws.amazon.com/pt/cloudwatch/)
- [CloudWatch CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- [Terraform](https://developer.hashicorp.com/terraform/downloads)
- [Cloudtrail Terraform](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudtrail)
- [CloudWatch Alarm](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_metric_alarm)

<style scoped>
    .image-center {
        text-align:center;
        font-size: 16px;
        font-weight: bold;
        font-style: italic;
    }

</style>

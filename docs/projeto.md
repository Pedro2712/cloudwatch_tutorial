# Porjeto de CloudWatch e CloudTrail - Monitoramento e auditoria de recursos na nuvem AWS


## Contexto do projeto

CloudWatch e CloudTrail são serviços da AWS (Amazon Web Services) que oferecem recursos para monitoramento e auditoria de recursos na nuvem.

O Amazon CloudWatch é um serviço de monitoramento que coleta e processa dados em tempo real, permitindo monitorar recursos da AWS, aplicativos personalizados e serviços. Com ele, é possível configurar alarmes para notificações baseadas em métricas específicas, monitorar logs de aplicativos, detectar e solucionar problemas, além de tomar ações automatizadas em resposta a mudanças nos recursos monitorados.

Já o Amazon CloudTrail é um serviço que registra todas as atividades realizadas em uma conta da AWS, incluindo ações realizadas pelo usuário, acesso aos recursos e alterações de configuração. Ele permite auditar as ações de usuários e serviços da AWS, rastrear alterações de recursos e garantir a conformidade com políticas de segurança e auditoria.

Com o objetivo de monitorar e auditar recursos na nuvem, este projeto tem como objetivo configurar duas instâncias em regiões diferentes para enviar logs para instâncias distintas do CloudWatch. As informações serão capturadas e redirecionadas ao usuário por meio do CloudTrail.

Com essas informações, o usuário poderá monitorar e auditar os recursos da AWS, garantindo a segurança, o desempenho e a eficiência de ambientes em nuvem. Além disso, ele poderá criar gráficos e dashboards para visualizar os dados de monitoramento e auditoria e criar alarmes para notificações baseadas em métricas específicas.

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

### Criação de instâncias EC2

Para criar as instâncias EC2, é necessário acessar o [console da AWS](https://console.aws.amazon.com/console/home) e realizar o login em sua conta. Em seguida, acesse o serviço EC2 e selecione a opção "Launch Instance", que pode estar indicada em inglês ou em português, como "Executar instância". Vale notar que por padrão a região selecionada é a `Leste dos EUA (Norte da Virgínia)`, mas é possível alterar a região no canto superior direito da tela. Para este projeto, vamos criar duas instâncias em regiões diferentes, então é importante selecionar uma região diferente para cada instância.

::: tip Dica
Para acessar o serviço EC2, é possível pesquisar por "EC2" no campo de busca do console da AWS ou navegar até a seção "Compute" e selecionar a opção "EC2".
:::

<figure class="image-center">
    <a href="">
        <img title="Features image" alt="Alt text" src="/image/executar_instancia.png">
    </a>
    <figcaption>Botão de criação da instância</figcaption>
    <br>
</figure>

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

<figure class="image-center">
    <a href="">
        <img title="Par de chaves" alt="Alt text" src="/image/par_chaves.png">
    </a>
    <figcaption>Criação do Par de chaves</figcaption>
    <br>
</figure>

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

<figure class="image-center">
    <a href="">
        <img title="Instância criada" alt="Alt text" src="/image/criacao_instancia.png">
    </a>
    <figcaption>Instância criada</figcaption>
    <br>
</figure>

Ao clicar no botão **Visualizar todas as instâncias**, você será redirecionado para a página de instâncias, onde poderá ver a instância que acabou de criar.

<figure class="image-center">
    <a href="">
        <img title="Instâncias" alt="Alt text" src="/image/instancias.png">
    </a>
    <figcaption>Conjuto de todas as instâncias criadas em uma região</figcaption>
    <br>
</figure>

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

<figure class="image-center">
    <a href="">
        <img title="Comandos do ssh" alt="Alt text" src="/image/comandos_ssh.png">
    </a>
    <figcaption>Aba de comandos para acessar a instância via SSH</figcaption>
    <br>
</figure>

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

<figure class="image-center">
    <a href="">
        <img title="Comandos do CloudWatch" alt="Alt text" src="/image/aba_cloudwatch.png">
    </a>
    <figcaption>Aba de criação e configuração do CloudWatch</figcaption>
    <br>
</figure>

Nela você pode criar e configurar os recursos do CloudWatch. Para criar um recurso, basta clicar no botão **Criar alarme**. Ao clicar nele será exibida uma janela com as opções de recursos que podem ser criados. Para criar um painel de monitoramento de instâncias, selecione a opção **Selecionar métrica**.

<figure class="image-center">
    <a href="">
        <img title="aba metrica" alt="Alt text" src="/image/aba_metrica.png">
    </a>
    <figcaption>Aba de criação da métrica</figcaption>
    <br>
</figure>

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

<figure class="image-center">
    <a href="">
        <img title="simbolo alarme" alt="Alt text" src="/image/alarme_ativo.png">
    </a>
    <figcaption>Símbolo com o alarme ativado</figcaption>
    <br>
</figure>

O email que você receberá será parecido com o email abaixo:

<figure class="image-center">
    <a href="">
        <img title="email alarme" alt="Alt text" src="/image/email_alarme.png">
    </a>
    <figcaption>Email com o alarme</figcaption>
    <br>
</figure>

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

Depois de configurar suas credenciais de acesso, você pode configurar o Terraform. Para isso, você precisa criar um arquivo chamado `main.tf` e adicionar o seguinte conteúdo:

::: tip Dica
Caso você utiliza o vscode, você pode instalar a extensão [HashiCorp Terraform](https://marketplace.visualstudio.com/items?itemName=HashiCorp.terraform) para ter suporte a sintaxe do Terraform.
:::

```bash
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region  = "us-east-1"
}

resource "aws_instance" "app_server" {
  ami           = "ami-0fc61db8544a617ed"
  instance_type = "t2.medium"

  tags = {
    Name = "InstanciaTerraform"
  }
}
```

A primeira seção do código:

```bash
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}
```

define as configurações do Terraform. O bloco `required_providers` especifica que o provedor AWS da HashiCorp é necessário para executar este plano de implantação. O provedor é baixado pelo Terraform durante a execução do plano. A versão ~> 4.16 especifica que o provedor deve ser pelo menos da versão 4.16, mas não deve ser superior à versão 5.0.0.

O bloco `required_version` define a versão mínima do Terraform necessária para executar o plano. Neste exemplo, a versão mínima é 1.2.0.

A segunda seção do código:

```bash
provider "aws" {
  region  = "us-east-1"
}
```

define o provedor AWS a ser usado para criar os recursos. O `region` especifica a região da AWS onde a instância EC2 será criada. Neste exemplo, a instância EC2 será criada na região `US East (N. Virginia)`.

A terceira seção do código:

```bash
resource "aws_instance" "app_server" {
  ami           = "ami-0fc61db8544a617ed"
  instance_type = "t2.medium"

  tags = {
    Name = "InstanciaTerraform"
  }
}
```

define o recurso a ser criado. No exemplo, é definido um recurso do tipo `aws_instance`, que cria uma instância `EC2`.

O `ami` especifica a AMI (Amazon Machine Image) a ser usada para criar a instância. Neste exemplo, a AMI é **Amazon Linux 2 AMI (HVM), SSD Volume Type**.

O `instance_type` especifica o tipo de instância EC2 a ser criado. Neste exemplo, uma instância do tipo `t2.medium` será criada.

O bloco `tags` define tags personalizadas a serem adicionadas à instância EC2. Neste exemplo, apenas uma tag `Name` é definida para a instância EC2 com o valor `"InstanciaTerraform"`.

Para executar o plano de implantação, você precisa executar o seguinte comando:

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

<figure class="image-center">
    <a href="">
        <img title="Instance Terraform" alt="Alt text" src="/image/instance_terraform.png">
    </a>
    <figcaption>Instância criada pelo terraform</figcaption>
    <br>
</figure>

Para destruir a instância EC2 criada, você precisa executar o seguinte comando:

```bash
terraform destroy
```

O comando acima irá destruir a instância EC2 criada. Para recriar a instância basta seguir os passos anteriores.

### Conectando o CloudWatch com o Terraform

Para conectar o CloudWatch e criar um alarme `CPUUtilization` com o Terraform, você precisa adicionar o seguinte código ao arquivo `main.tf`:

```bash
# Configura o provedor AWS
provider "aws" {
  region = "us-east-1"
}

# Cria uma instância EC2
resource "aws_instance" "ec2_instance" {
  ami           = "ami-0fc61db8544a617ed" # Ubuntu 20.04 LTS
  instance_type = "t2.medium"

  tags = {
    Name = "Instacia cloudwatch"
  }
}

# Cria uma política do IAM para conceder permissão ao CloudWatch
resource "aws_iam_policy" "cw_policy" {
  name = "ec2-cw-policy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "cloudwatch:GetMetricStatistics",
          "cloudwatch:DescribeAlarms",
          "cloudwatch:PutMetricAlarm"
        ]
        Effect   = "Allow"
        Resource = "*"
      }
    ]
  })
}

# Cria uma role do IAM para ser usada pela instância EC2
resource "aws_iam_role" "ec2_role" {
  name = "ec2-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
}

# Associa a política e a role do IAM à instância EC2
resource "aws_iam_role_policy_attachment" "ec2_policy_attachment" {
  policy_arn = aws_iam_policy.cw_policy.arn
  role       = aws_iam_role.ec2_role.name
}

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
    InstanceId = aws_instance.ec2_instance.id
  }
}
```

## Referências

- [CloudWatch](https://aws.amazon.com/pt/cloudwatch/)
- [CloudWatch CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- [Terraform](https://developer.hashicorp.com/terraform/downloads)

<style scoped>
    .image-center {
        text-align:center;
        font-size: 13px;
        font-weight: bold;
        font-style: italic;
    }
    .image-center img {
        display: block;
        margin: 0 auto;
    }

</style>
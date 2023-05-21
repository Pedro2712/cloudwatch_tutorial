---
title: Contextualização
sidebar: true
hero: true
---

<VPDocHero
    class="VPDocHero"
    name="Contextualização"
    text="das ferramentas utilizadas"
    tagline="2023"
/>

CloudWatch e CloudTrail são serviços da AWS (Amazon Web Services) que oferecem recursos para monitoramento e auditoria de recursos na nuvem.

O Amazon CloudWatch é um serviço de monitoramento que coleta e processa dados em tempo real, permitindo monitorar recursos da AWS, aplicativos personalizados e serviços. Com ele, é possível configurar alarmes para notificações baseadas em métricas específicas, monitorar logs de aplicativos, detectar e solucionar problemas, além de tomar ações automatizadas em resposta a mudanças nos recursos monitorados.

Já o Amazon CloudTrail é um serviço que registra todas as atividades realizadas em uma conta da AWS, incluindo ações realizadas pelo usuário, acesso aos recursos e alterações de configuração. Ele permite auditar as ações de usuários e serviços da AWS, rastrear alterações de recursos e garantir a conformidade com políticas de segurança e auditoria.

Com o objetivo de monitorar e auditar recursos na nuvem, este projeto visa configurar duas instâncias em regiões diferentes para enviar logs para instâncias distintas do CloudWatch. Assim, serão criados oito tipos de alarmes diferentes, que, quando ativados, enviarão um e-mail ao usuário responsável. Além disso, devido às limitações dos alarmes existentes no CloudWatch, faremos uso do CloudTrail para canalizar e armazenar todos os logs das instâncias criadas. Com base nesses logs, poderemos criar alarmes personalizados, como, por exemplo, um alarme que seja acionado sempre que uma instância for interrompida. Esse tipo de alarme não seria possível de ser configurado sem o uso do CloudTrail.

Com essas informações, o usuário poderá monitorar e auditar os recursos da AWS, garantindo a segurança, o desempenho e a eficiência de ambientes em nuvem. Além disso, ele poderá criar gráficos e dashboards para visualizar os dados de monitoramento e auditoria.
# USER-MANAGER 
UC-02 - ADICIONAR UTILIZADOR
1. o campo número de telemóvel é opicional, mas não  pode haver dois número de telemóveis iguais
2. O sistema deve enviar email com corpo de mensagem informativoem formato html
3. O sistema deve guardar os logs do email enviado

# SCHEDULING TIME

UC-08 - INTRODUZIR FAIXAS HORÁRIAS
1. Não pode haver a mesma características na configuração dos horários de agendamentos
2. A configuração de agendamento deve ter pelo menos um funcionário,
3. A data de início de configuração de agendamento deve ser posterior a data atual"
4. [HORA FIM TRALHAO]
 - deve ser superior a hora de início de trabalho
 
   
5. [HORA INÍCIO ALMOÇO] 
   1. Deve ser superior a hora de início de trabalho 
   2. Deve ser inferior a hora do fim de trabalho

6. [HORA FIM ALMOÇO]
   1. Deve ser superior a hora de início de almoço
   2. Deve ser superior a hora de início de trabalho
   3. Deve ser inferior a hora de fim de trabalho

7. Deve ser introduzida  horários entre beginWorkTime e endWorkTime, adicionando o número de intervalo de atendimento a segundos de uma hora
8. Se a data de fim for null, deve ser considerada apenas a configuração do agendamento da data de início

 UC-09 - LISTAR FAIXAS HORÁRIAS
  
   1. [A listagem das horas disponíveis para data atuala ser apresentado, depende da hora em que o utilizador estiver a efetuar o agendamento]
       2.1 [HORÁRIO EM QUE O CIDADÃO ESTÁ A EFETUAR O AGENDAMENTO]
        2.1.1 Deve ser listado apenas as horas superiores a hora da data atual em que o utilizador selecionou a data para verificar a disponibilidade horária 
		
      

  3. Excluir os fins de semanas
  4. Exluir feriados (tabela Hollyday)
  5. Excluir agendamentos que estão na tabela SchedulingHistory

# SCHEDULING

UC-12 - EFETUAR AGENDAMENTO

1. Não pode haver agendamentos com as mesmas caracterísitcas para o mesmo utilizador
    
   - Agendar na mesma data e hora
   - Agendar o mesmo serviço na mesma data e hora
   - Agendar outros serviços na mesma data e hora
   - Agendar o mesmo serviço que ainda estão com estado "por atender" (E se o cidadão for atendido, mas o funcionário esqueceu de alterar o estado?)
   - Agendar na mesma hora que a hora da data atual
  
  
2. O cidadão só pode agendar até 1h antes do fim do trabalho  -QUESTIONAR A DOUTORA

2. Quando o mesmo utilizador tenta fazer outro agendamento, o sistema deve recuperar informação desse utilizador e associar ao agendamento.
3. O número de telemóvel deixa de ser único, ficando apenas o email como unique??

4. Quando o utilizador submeter o pedido para efetuar agendamento, deve ser sempre verificada a disponibilidade da data e hora escolhida a ser agendada (usar Semhphore do node Js para bloquear a data e hora).
 - Isto porque mesmo as datas e horas terem sido apresentadas como disponíveis na listagem de horários de agendamentos, alguém pode já ter escolhido a última data e hora disponível. Logo, outro utilizador não pode escolher essa data e hora. 

5. Cada vez  que o número de agendamentos feitos para a mesma data e hora(por um utilizador diferente) for igual(=) número colaborador disponível diário, 
para essa data e hora, o agendamento é feito e é atualizada a tabela de schedulingHistory, ficando a data e hora como indisponíveis.
 A tabela SchedulingHistory deve ser atualizada, pondo o campo available=0 (false) para aquela data e a mesma hora(s)

6. Quando o agendamento é efetuado, o sistema deve enviar email ao utilizador


UC-13 - LISTAR AGENDAMENTOS

1. Por default, devem ser listadas agendamentos da data atual
2. A listagem deve ser paginado com page =1 default e pageSize=5 por default
3. A listagem deve ser ordenado por default por ordem descendente(do mais recente para o mais antigo)
4. Deve ser possível combinar os vários filtros(Data de início, data de fim, hora, estado de agendamento)
5. [REGRA GERAL DE FILTRAGEM]
   1. [Dados de filtros]
      - [Se não forem enviados, os seguintes campos devem assumir os seguintes valores por default]:
   1. Data de início e data de fim de criação de agendamento = data atual
   2. Estado de agendamento = Por atender
   3. Coluna de ordeção = Id
   4. Direção = DESC (do mais recente para o mais antigo)
   5. Número da página =1
   6. Tamanho da página=5
   [Envios de filtros parciais]
   1. Se a data de fim de agendamento for preenchido, a data de início de agendamento é obrigatório
   2.  Se a data de fim de agendamento e a data de início de agendamento forem preenchidos, a data de fim de agendamento
   deve ser iagual OU superior a data de inicio de agendamento
   3. se a data de início de agendamento for preenchido e a data de fim de agendamento não for preenchido, a data de fim de agendamento
   deve ser IGUAL a data de início de agendamento
   
   

UC-15 – Alterar dados do agendamento

 As validações as validações de efetuar agendamento, UC-12 - EFETUAR AGENDAMENTO
# USER-MANAGER 
UC-02 - ADICIONAR UTILIZADOR
1. o campo número de telemóvel é opicional, mas não  pode haver dois número de telemóveis iguais
2. O sistema deve enviar email com corpo de mensagem informativoem formato html
3. O sistema deve guardar os logs do email enviado

# SCHEDULING TIME

UC-08 - INTRODUZIR FAIXAS HORÁRIAS
1. Não pode haver a mesma características na configuração dos horários de agendamentos
2. Deve ser introduzida  horários entre beginWorkTime e endWorkTime, adicionando o número de intervalo de atendimento a segundos de uma hora
3. Se a data de fim for null, deve ser considerada apenas a configuração do agendamento da data de início
4. A configuração de agendamento deve ter pelo menos um funcionário,
5. A data de início de configuração de agendamento deve ser posterior a data atual"
6. [HORA FIM TRALHAO]
 - deve ser superior a hora de início de trabalho
 
7. [HORA FIM ALMOÇO]
   -Deve ser superior a hora de início de almoço
   -Deve ser superior a hora de início de trabalho
  
8. [HORA INÍCIO ALMOÇO] 
   -Deve ser superior a hora de início de trabalho 
  - Deve ser inferior a hora do fim de trabalho


# SCHEDULING

UC-12 - EFETUAR AGENDAMENTO

1. Quando um cidadão clicar para efetuar agendamento, deve ter um serviço que o frontend vai chamar que vai apresentar as datas para 3 ou seis meses(definir com a Doutora) e as horas que estão apenas disponíveis. 
  1.1.  Na listagem de horários disponíveis, para cada data, devem ser apresentadas apenas os horários que não estão nas seguintes tabelas:
  - SchedulingHistory (tabela que armazena agendamentos já fechados)
   Configuração dos feriados (tabela que armazena os feriados do ano civil - Começa no dia 1 de janeiro e termina no dia 31 de Dezembro)
  1.2. Para cada data, devem ser retiradas os fins de semanas:

  RESULTO FINAL DA LISTAGEM DE HORÁRIOS DE AGENDAMENTOS A SER APRESENTADO AO UTILIZADOR:
 - Listagem de horários sem os fins de semanas e feriados e apenas com as horas disponíveis.

2. Não pode haver agendamentos com as mesmas caracterísitcas para o mesmo utilizador


3. Quando o utilizador submeter o pedido para efetuar agendamento, deve ser sempre verificada a disponibilidade da data e hora escolhida a ser agendada (usar Semhphore do node Js para bloquear a data e hora).
 - Isto porque mesmo as datas e horas terem sido apresentadas como disponíveis na listagem de horários de agendamentos, alguém pode já ter escolhido a última data e hora disponível. Logo, outro utilizador não pode escolher essa data e hora. 

 
6. Cada vez  que o número de agendamentos feitos para a mesma data e hora for igual(=) número colaborador disponível diário, para essa data e hora, o agendamento é feito e é atualizada a tabela de schedulingHistory, ficando a data e hora como indisponíveis. A tabela SchedulingHistory deve ser atualizada, pondo o campo available=0 (false)



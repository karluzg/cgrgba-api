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
  1. A Data de agendamento deve ser superior ou igual a data atual
  1. Excluir os fins de semanas
  2. Exluir feriados (tabela Hollyday)
  3. Excluir agendamentos que estão na tabela SchedulingHistory

# SCHEDULING

UC-12 - EFETUAR AGENDAMENTO

1. Não pode haver agendamentos com as mesmas caracterísitcas para o mesmo utilizador
   - Agendar os mesmos serviços na mesma data
   - Agendar os mesmos serviços que ainda estão por atender, mesmo que seja numa data posterior 

2. Quando o mesmo utilizador tenta fazer outro agendamento, o sistema deve recuperar informação desse utilizador e associar ao agendamento.
3. O número de telemóvel deixa de ser único, ficando apenas o email como unique

4. Quando o utilizador submeter o pedido para efetuar agendamento, deve ser sempre verificada a disponibilidade da data e hora escolhida a ser agendada (usar Semhphore do node Js para bloquear a data e hora).
 - Isto porque mesmo as datas e horas terem sido apresentadas como disponíveis na listagem de horários de agendamentos, alguém pode já ter escolhido a última data e hora disponível. Logo, outro utilizador não pode escolher essa data e hora. 

5. Cada vez  que o número de agendamentos feitos para a mesma data e hora for igual(=) número colaborador disponível diário, para essa data e hora,
 o agendamento é feito e é atualizada a tabela de schedulingHistory, ficando a data e hora como indisponíveis. A tabela SchedulingHistory deve ser atualizada, pondo o campo available=0 (false)

6. Quando o agendamento é efetuado, o sistema deve enviar email ao utilizador


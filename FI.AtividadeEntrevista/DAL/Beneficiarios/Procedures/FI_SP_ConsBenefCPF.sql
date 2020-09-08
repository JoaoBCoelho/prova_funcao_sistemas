﻿CREATE PROC FI_SP_ConsBenefCPF
	@CPF VARCHAR(11),
	@IDCLIENTE BIGINT
AS
BEGIN
		SELECT NOME, CPF, IDCLIENTE, ID FROM BENEFICIARIOS WITH(NOLOCK) WHERE CPF = @CPF AND IDCLIENTE = @IDCLIENTE
END
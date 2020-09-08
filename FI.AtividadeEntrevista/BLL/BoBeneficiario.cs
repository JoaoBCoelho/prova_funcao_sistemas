using FI.AtividadeEntrevista.DML;
using FI.AtividadeEntrevista.Helper;
using FI.AtividadeEntrevista.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
        /// <summary>
        /// Inclui um novo Beneficiario
        /// </summary>
        /// <param name="beneficiario">Objeto de Beneficiario</param>
        public long Incluir(Beneficiario beneficiario)
        {
            ValidarCPF(beneficiario);
            DAL.DaoBeneficiario benef = new DAL.DaoBeneficiario();
            return benef.Incluir(beneficiario);
        }

        /// <summary>
        /// Consulta o Beneficiario pelo cpf
        /// </summary>
        /// <param name="cpf">cpf do Beneficiario</param>
        /// <param name="idCliente">id do cliente</param>
        /// <returns></returns>
        public Beneficiario ConsultarCPF(string cpf, long idCliente)
        {
            DAL.DaoBeneficiario benef = new DAL.DaoBeneficiario();
            return benef.ConsultarCPF(cpf, idCliente);
        }

        /// <summary>
        /// Altera um Beneficiario
        /// </summary>
        /// <param name="beneficiario">Objeto de Beneficiario</param>
        public void Alterar(Beneficiario beneficiario)
        {
            ValidarCPF(beneficiario);
            DAL.DaoBeneficiario benef = new DAL.DaoBeneficiario();
            benef.Alterar(beneficiario);
        }

        /// <summary>
        /// Excluir o Beneficiario pelo id
        /// </summary>
        /// <param name="id">id do Beneficiario</param>
        /// <returns></returns>
        public void Excluir(long id)
        {
            DAL.DaoBeneficiario benef = new DAL.DaoBeneficiario();
            benef.Excluir(id);
        }

        /// <summary>
        /// Lista todos os Beneficiarios ou todos beneficiários relacionados a um cliente
        /// </summary>
        public List<Beneficiario> Listar(long? idCliente)
        {
            DAL.DaoBeneficiario benef = new DAL.DaoBeneficiario();
            return benef.Listar(idCliente);
        }

        private void ValidarCPF(Beneficiario Beneficiario)
        {
            Beneficiario.CPF = CPFHelper.RemoverMascaraCPF(Beneficiario.CPF);
            ValidarCPFValido(Beneficiario.CPF);
            ValidarRegistroCPF(Beneficiario);
        }

        private void ValidarRegistroCPF(Beneficiario beneficiario)
        {
            var registro = ConsultarCPF(beneficiario.CPF, beneficiario.IdCliente);

            if (registro != null && registro.Id != beneficiario.Id)
                throw new BLLException("Já existe um registro para esse cliente com o CPF informado.");
        }

        private void ValidarCPFValido(string cpf)
        {
            if (!CPFHelper.ValidarCPF(cpf))
                throw new BLLException("O CPF Informado é inválido.");
        }
    }
}

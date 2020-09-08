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
    public class BoCliente
    {
        /// <summary>
        /// Inclui um novo cliente
        /// </summary>
        /// <param name="cliente">Objeto de cliente</param>
        public long Incluir(DML.Cliente cliente)
        {
            ValidarCPF(cliente);            
            DAL.DaoCliente cli = new DAL.DaoCliente();
            return cli.Incluir(cliente);
        }

        /// <summary>
        /// Altera um cliente
        /// </summary>
        /// <param name="cliente">Objeto de cliente</param>
        public void Alterar(DML.Cliente cliente)
        {
            ValidarCPF(cliente);
            DAL.DaoCliente cli = new DAL.DaoCliente();
            cli.Alterar(cliente);
        }

        /// <summary>
        /// Consulta o cliente pelo id
        /// </summary>
        /// <param name="id">id do cliente</param>
        /// <returns></returns>
        public DML.Cliente Consultar(long id)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            return cli.Consultar(id);
        }

        /// <summary>
        /// Consulta o cliente pelo cpf
        /// </summary>
        /// <param name="cpf">cpf do cliente</param>
        /// <returns></returns>
        public DML.Cliente ConsultarCPF(string cpf)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            return cli.ConsultarCPF(cpf);
        }

        /// <summary>
        /// Excluir o cliente pelo id
        /// </summary>
        /// <param name="id">id do cliente</param>
        /// <returns></returns>
        public void Excluir(long id)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            cli.Excluir(id);
        }

        /// <summary>
        /// Lista os clientes
        /// </summary>
        public List<DML.Cliente> Listar()
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            return cli.Listar();
        }

        /// <summary>
        /// Lista os clientes
        /// </summary>
        public List<DML.Cliente> Pesquisa(int iniciarEm, int quantidade, string campoOrdenacao, bool crescente, out int qtd)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            return cli.Pesquisa(iniciarEm, quantidade, campoOrdenacao, crescente, out qtd);
        }

        private void ValidarCPF(Cliente cliente)
        {
            cliente.CPF = CPFHelper.RemoverMascaraCPF(cliente.CPF);
            ValidarCPFValido(cliente.CPF);
            ValidarRegistroCPF(cliente);
        }

        private void ValidarRegistroCPF(Cliente cliente)
        {
            var registro = ConsultarCPF(cliente.CPF);

            if (registro != null && registro.Id != cliente.Id)
                throw new BLLException("Já existe um registro com o CPF informado.");
        }

        private void ValidarCPFValido(string cpf)
        {
            if (!CPFHelper.ValidarCPF(cpf))
                throw new BLLException("O CPF Informado é inválido.");
        }
    }
}

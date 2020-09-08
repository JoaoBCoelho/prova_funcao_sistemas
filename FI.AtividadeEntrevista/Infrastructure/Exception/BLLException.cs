using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.Infrastructure
{
    public class BLLException : Exception
    {
        public BLLException(string message) : base(message) { }
    }
}

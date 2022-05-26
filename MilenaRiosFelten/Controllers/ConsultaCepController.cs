using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MilenaRiosFelten.Correios;
using MilenaRiosFelten.Models;

namespace MilenaRiosFelten.Controllers
{
    public class ConsultaCepController : Controller
    {
        #region [ Váriaveis Privada ]

        private readonly AtendeClienteClient _atendeClienteClient;
        private readonly Endereco _endereco;

        #endregion

        #region [ Construtor ]

        public ConsultaCepController() 
        { 
            _atendeClienteClient = new AtendeClienteClient();
            _endereco = new Endereco();
        }

        #endregion

        #region [ POST ]
        [HttpPost]
        [Route("http://ObterEnderecoCEP/{cep}")]
        public HttpResponseMessage ObterEnderecoCEP(Cep cep)
        {
            try
            {
                var consulta = _atendeClienteClient.consultaCEP(cep.Codigo.Replace("-", ""));
                return Request.CreateResponse(HttpStatusCode.OK,
                                                _endereco.UF = consulta.uf,
                                                _endereco.Cidade = consulta.cidade,
                                                _endereco.Bairro = consulta.bairro,
                                                _endereco.Rua = consulta.end);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        #endregion
    }
}
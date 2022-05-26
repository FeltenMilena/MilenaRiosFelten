using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MilenaRiosFelten.Correios;
using MilenaRiosFelten.Models;

namespace MilenaRiosFelten.Controllers
{
    public class HomeController : Controller
    {
        #region [ Váriaveis Privada ]

        private readonly AtendeClienteClient _atendeClienteClient;
        private readonly Endereco _endereco;

        #endregion

        #region [ Construtor ]

        public HomeController() 
        { 
            _atendeClienteClient = new AtendeClienteClient();
            _endereco = new Endereco();
        }

        #endregion

        #region [ POST ]
        [HttpPost]
        public ActionResult Index(Cep cep)
        {
            if (!ModelState.IsValid)
            {
                return View(cep);
            }
            var consulta = _atendeClienteClient.consultaCEP(cep.Codigo.Replace("-", ""));
            if(consulta != null)
            {
                _endereco.UF = consulta.uf;
                _endereco.Cidade = consulta.cidade;
                _endereco.Bairro = consulta.bairro;
                _endereco.Rua = consulta.end;
            }

            return View(cep);
        }
        #endregion
    }
}
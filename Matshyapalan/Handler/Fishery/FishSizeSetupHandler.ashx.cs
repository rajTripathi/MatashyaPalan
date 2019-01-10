using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UTILITY;
using AttFishary;
using BllFishary;

namespace Matshyapalan.Handler.Fishery
{
    /// <summary>
    /// Summary description for FishSizeSetupHandler
    /// </summary>
    public class FishSizeSetupHandler : IHttpHandler
    {

        public object GetFishCategoryType(int ExpItmId, string Visibility, string p_rc, string role)
        {
            BllFishSizeSetup objBll = new BllFishSizeSetup();

            JsonResponse response = new JsonResponse();
            try
            {
                response.ResponseData = objBll.GetFishCategoryType(ExpItmId, Visibility, p_rc, role);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.Write("Hello World");
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

      

    }
}
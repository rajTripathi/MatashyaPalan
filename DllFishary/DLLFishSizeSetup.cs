using AttFishary;
using MajorConn;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DllFishary
{
  public  class DLLFishSizeSetup
    {
        string SP = "";
        public List<LoginAtt> GetFishCategoryType(int ExpItmId, string Visibility, string p_rc, string role)
        {
        //    GetConnection conn = new GetConnection();
        //    OracleConnection dbConn = conn.GetDbConn(role);
        //    OracleTransaction tran = dbConn.BeginTransaction();
           List<LoginAtt> lst = new List<LoginAtt>();
        //    try
        //    {

        //        string SP = "EPR_GET_EXPENDITURE_ITEM";
        //        //string SP = "EPR_GET_ETB_SYMBOL";
        //        List<OracleParameter> paramList = new List<OracleParameter>();
        //        paramList.Add(SqlHelper.GetOraParam(":P_EXP_ITEM_ID", null, OracleDbType.Varchar2, ParameterDirection.Input));
        //        paramList.Add(SqlHelper.GetOraParam(":P_VISIBILITY", Visibility, OracleDbType.Varchar2, ParameterDirection.Input));
        //        paramList.Add(SqlHelper.GetOraParam(":p_rc", p_rc, OracleDbType.RefCursor, ParameterDirection.Output));

        //        DataSet ds = SqlHelper.ExecuteDataset(dbConn, CommandType.StoredProcedure, SP, paramList.ToArray());

        //        foreach (DataRow drow in ds.Tables[0].Rows)
        //        {
        //            // ATTExpenseHeadType obj = new ATTExpenseHeadType();

        //            // obj.ExpenseHeadTypeID = Convert.ToInt32(drow["EXP_ITEM_ID"]);
        //            // obj.DescriptionInNepali = drow["ITEM_DESC"].ToString();
        //            // obj.DescriptionInEnglish = drow["ITEM_DESC_ENG"].ToString();
        //            // obj.Status = drow["R_STATUS"].ToString();
        //            //// obj.Visibility = drow["VISIBILITY"].ToString();
        //            // if (drow["VISIBILITY"].ToString() == "A")
        //            // {
        //            //     obj.Visibility = "true";
        //            // }
        //            // else
        //            // {
        //            //     obj.Visibility = "false";
        //            // }
        //            // obj.EntryBy = drow["ENTRY_BY"].ToString();
        //            // obj.EntryDate = drow["ENTRY_DATE"].ToString();


        //            ATTPostExpense obj = new ATTPostExpense();
        //            obj.ExpenseHeadType = new ATTExpenseHeadType();


        //            obj.ExpenseHeadType.ExpenseHeadTypeID = Convert.ToInt32(drow["EXP_ITEM_ID"]);
        //            obj.ExpenseHeadType.DescriptionInNepali = drow["ITEM_DESC"].ToString();
        //            obj.ExpenseHeadType.DescriptionInEnglish = drow["ITEM_DESC_ENG"].ToString();
        //            obj.ExpenseHeadType.Status = drow["R_STATUS"].ToString();
        //            obj.ExpenseHeadType.EntryBy = drow["ENTRY_BY"].ToString();
        //            obj.ExpenseHeadType.EntryDate = drow["ENTRY_DATE"].ToString();
        //            if (drow["VISIBILITY"].ToString() == "A")
        //            {
        //                obj.ExpenseHeadType.Visibility = "true";
        //            }
        //            else
        //            {
        //                obj.ExpenseHeadType.Visibility = "false";
        //            }

        //            obj.Amount = 0.00;
        //            lst.Add(obj);
        //        }

              return lst;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception(ex.Message);

        //    }
        //    finally
        //    {
        //        conn.CloseDbConn();
        //    }

        }


        public string SaveFishSize(List<FishSizeATT> obj, string role)
        {
            string SP = "";
            string msg = "";
            char status;
            SqlCommand oCommand = new SqlCommand();
            oCommand.CommandType = CommandType.StoredProcedure;
            oCommand.CommandText = "mt_login";
            SqlParameter[] objParameter = new SqlParameter[2];
            foreach (FishSizeATT ob in obj)
            {
                objParameter[0] = new SqlParameter("@username", ob.SizeName);

                // objParameter[1] = new SqlParameter("@password", obj.Password);
                objParameter[2] = new SqlParameter("@submitteddate", "2018.01.07");
                objParameter[3] = new SqlParameter("@submittebBy", "Admin");
                SqlDataReader dr = SqlHelper.ExecuteReader(oCommand, objParameter);
                if (dr.HasRows)
                {
                    msg = "";

                }
                else
                {
                    msg = " कुनै डाटा छैन!!!";
                }
            }

            return msg;

        }

    }
}

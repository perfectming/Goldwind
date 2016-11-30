<%@ WebHandler Language="C#"  Class="yc_website.UploadHandler" %>

using System; 
using System.Web;
using System.IO;
using yc.Common;
using System.Collections;
namespace yc_website
{
    public class UploadHandler : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.Charset = "utf-8";

            string uploadPath = HttpContext.Current.Server.MapPath("/attached/files/");

            HttpPostedFile imgFile = context.Request.Files["file"];
            if (imgFile != null)
            {
                FileInfo info = new FileInfo(HttpContext.Current.Server.MapPath(imgFile.FileName));
                String fileExt = ".jpg|.png|.gif";

                if (String.IsNullOrEmpty(fileExt) || fileExt.IndexOf(info.Extension.ToLower()) == -1)
                {
                    context.Response.Write("{'status':'n','info':'上传文件扩展名是不允许的扩展名。只允许" + fileExt + "格式。'}");
                    return;
                }

                string uploadFileName = Utils.GetOrderNO() + info.Extension;

                if (!Directory.Exists(uploadPath))
                {
                    Directory.CreateDirectory(uploadPath);
                }

                string UploadFile = uploadPath + uploadFileName;

                imgFile.SaveAs(UploadFile);

                //下面这句代码缺少的话，上传成功后上传队列的显示不会自动消失
                context.Response.Write("{'status':'y','info':'/attached/files/" + uploadFileName + "'}");
            }
            else
            {
                context.Response.Write("{'status':'n','info':'上传图片失败'}");
            }
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
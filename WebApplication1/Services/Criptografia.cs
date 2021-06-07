using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace WebApplication1.Services
{
    public class Criptografia
    {


        public static string Cripitografar(string data)
        {
            if (data.Trim() != "")
            {
                TripleDESCryptoServiceProvider tripledescryptoserviceprovider = new TripleDESCryptoServiceProvider();
                MD5CryptoServiceProvider md5cryptoserviceprovider = new MD5CryptoServiceProvider();
                string key = "SyS@123456#sys#";
                tripledescryptoserviceprovider.Key = md5cryptoserviceprovider.ComputeHash(ASCIIEncoding.ASCII.GetBytes(key));
                tripledescryptoserviceprovider.Mode = CipherMode.ECB;
                ICryptoTransform desdencrypt = tripledescryptoserviceprovider.CreateEncryptor();
                ASCIIEncoding MyASCIIEncoding = new ASCIIEncoding();
                byte[] buff = Encoding.UTF8.GetBytes(data);
                //data = System.Text.ASCIIEncoding.ASCII.GetString(desdencrypt.TransformFinalBlock(teste,0,teste.Length);
                return Convert.ToBase64String(desdencrypt.TransformFinalBlock(buff, 0, buff.Length));
            }
            else
            {
                return "";
            }
        }

                public static string decripitografar(string data)
        {
               byte[] teste = Convert.FromBase64String(data);
            if (data.Trim() != "")
            {
                TripleDESCryptoServiceProvider tripledescryptoserviceprovider = new TripleDESCryptoServiceProvider();
                MD5CryptoServiceProvider md5cryptoserviceprovider = new MD5CryptoServiceProvider();
                string key = "SyS@123456#sys#";
                tripledescryptoserviceprovider.Key = md5cryptoserviceprovider.ComputeHash(ASCIIEncoding.ASCII.GetBytes(key));
                tripledescryptoserviceprovider.Mode = CipherMode.ECB;
                ICryptoTransform desdencrypt = tripledescryptoserviceprovider.CreateDecryptor();
                ASCIIEncoding MyASCIIEncoding = new ASCIIEncoding();
                //byte[] buff = Encoding.ASCII.GetBytes(data);
                data = System.Text.UTF8Encoding.UTF8.GetString(desdencrypt.TransformFinalBlock(teste,0,teste.Length));
                return data;
            }
            else
            {
                return "";
            }
        }

    }
}

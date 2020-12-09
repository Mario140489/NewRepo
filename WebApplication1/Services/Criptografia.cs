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
                byte[] buff = Encoding.ASCII.GetBytes(data);

                return Convert.ToBase64String(desdencrypt.TransformFinalBlock(buff, 0, buff.Length));
            }
            else
            {
                return "";
            }
        }

    }
}

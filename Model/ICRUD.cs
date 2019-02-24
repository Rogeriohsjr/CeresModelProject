using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace Ceres.Model
{
    public interface ICRUD<T>
    {
        void Create(T pObj);
        void Delete(Int32 pId);
        void Update(T pObj);
        T GetById(Int32 pId);
        List<T> GetAll();
        void Save(T pObj);
    }
}
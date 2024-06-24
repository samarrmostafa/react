import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('categories');
  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [price, setPrice] = useState('');

  const [counts, setCounts] = useState({
    categories: 0,
    subcategories: 0,
    products: 0,
    users: 0,
  });

  useEffect(() => {
    // Fetch data based on the active component
    // Replace with actual API calls
    const fetchData = () => {
      switch (activeComponent) {
        case 'categories':
          const categoriesData = [{ id: 1, name: 'Category 1' }, { id: 2, name: 'Category 2' }];
          setData(categoriesData);
          setCounts(prev => ({ ...prev, categories: categoriesData.length }));
          break;
        case 'subcategories':
          const subcategoriesData = [{ id: 1, name: 'Subcategory 1' }, { id: 2, name: 'Subcategory 2' }];
          setData(subcategoriesData);
          setCounts(prev => ({ ...prev, subcategories: subcategoriesData.length }));
          break;
        case 'products':
          const productsData = [
            { id: 1, name: 'Product 1', category: 'Category 1', subcategory: 'Subcategory 1', price: '10.00' },
            { id: 2, name: 'Product 2', category: 'Category 2', subcategory: 'Subcategory 2', price: '20.00' }
          ];
          setData(productsData);
          setCounts(prev => ({ ...prev, products: productsData.length }));
          break;
        case 'users':
          const usersData = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];
          setData(usersData);
          setCounts(prev => ({ ...prev, users: usersData.length }));
          break;
        default:
          break;
      }
    };

    fetchData();
  }, [activeComponent]);

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  const handleSave = () => {
    if (editingItem) {
      setData(data.map(item => (item.id === editingItem.id ? { ...item, name: itemName, category, subcategory, price } : item)));
    } else {
      const newItem = { id: data.length + 1, name: itemName, category, subcategory, price };
      setData([...data, newItem]);
    }
    resetForm();
  };

  const resetForm = () => {
    setItemName('');
    setCategory('');
    setSubcategory('');
    setPrice('');
    setEditingItem(null);
    setIsAdding(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-orange-500 text-white p-4">
        <nav>
          <ul className="space-y-2">
            <li 
              className={`cursor-pointer p-2 rounded ${activeComponent === 'categories' ? 'bg-orange-400' : 'hover:bg-orange-400'}`}
              onClick={() => setActiveComponent('categories')}
            >
              Categories ({counts.categories})
            </li>
            <li 
              className={`cursor-pointer p-2 rounded ${activeComponent === 'subcategories' ? 'bg-orange-400' : 'hover:bg-orange-400'}`}
              onClick={() => setActiveComponent('subcategories')}
            >
              Subcategories ({counts.subcategories})
            </li>
            <li 
              className={`cursor-pointer p-2 rounded ${activeComponent === 'products' ? 'bg-orange-400' : 'hover:bg-orange-400'}`}
              onClick={() => setActiveComponent('products')}
            >
              Products ({counts.products})
            </li>
            <li 
              className={`cursor-pointer p-2 rounded ${activeComponent === 'users' ? 'bg-orange-400' : 'hover:bg-orange-400'}`}
              onClick={() => setActiveComponent('users')}
            >
              Users ({counts.users})
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex-1 flex flex-col">
        <header className="bg-orange-500 shadow p-4">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        </header>
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold capitalize text-gray-700">{activeComponent}</h2>
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600 transition"
              onClick={() => setIsAdding(true)}
            >
              {activeComponent === 'products' ? 'Add Product' : 'Add New Item'}
            </button>
          </div>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-200 text-gray-800">ID</th>
                  <th className="py-2 px-4 bg-gray-200 text-gray-800">Name</th>
                  {activeComponent === 'products' && <th className="py-2 px-4 bg-gray-200 text-gray-800">Category</th>}
                  {activeComponent === 'products' && <th className="py-2 px-4 bg-gray-200 text-gray-800">Subcategory</th>}
                  {activeComponent === 'products' && <th className="py-2 px-4 bg-gray-200 text-gray-800">Price</th>}
                  <th className="py-2 px-4 bg-gray-200 text-gray-800">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map(item => (
                  <tr key={item.id} className="border-t">
                    <td className="py-2 px-4">{item.id}</td>
                    <td className="py-2 px-4">{item.name}</td>
                    {activeComponent === 'products' && <td className="py-2 px-4">{item.category}</td>}
                    {activeComponent === 'products' && <td className="py-2 px-4">{item.subcategory}</td>}
                    {activeComponent === 'products' && <td className="py-2 px-4">{item.price}</td>}
                    <td className="py-2 px-4">
                      <button
                        className="bg-orange-500 text-white px-2 py-1 mr-2 rounded shadow hover:bg-orange-600 transition"
                        onClick={() => { 
                          setEditingItem(item); 
                          setItemName(item.name); 
                          setCategory(item.category || '');
                          setSubcategory(item.subcategory || '');
                          setPrice(item.price || '');
                          setIsAdding(false); 
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded shadow hover:bg-red-600 transition"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {(isAdding || editingItem) && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4 text-orange-500">{editingItem ? 'Edit' : 'Add'} {activeComponent.slice(0, -1)}</h2>
                <input
                  type="text"
                  className="border p-2 w-full mb-4 rounded"
                  placeholder={`${activeComponent.slice(0, -1)} name`}
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
                {activeComponent === 'products' && (
                  <>
                    <input
                      type="text"
                      className="border p-2 w-full mb-4 rounded"
                      placeholder="Category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                    <input
                      type="text"
                      className="border p-2 w-full mb-4 rounded"
                      placeholder="Subcategory"
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                    />
                    <input
                      type="text"
                      className="border p-2 w-full mb-4 rounded"
                      placeholder="Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </>
                )}
                <div className="flex justify-end">
                  <button className="bg-orange-500 text-white px-4 py-2 mr-2 rounded shadow hover:bg-orange-600 transition" onClick={handleSave}>
                    Save
                  </button>
                  <button className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600 transition" onClick={resetForm}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

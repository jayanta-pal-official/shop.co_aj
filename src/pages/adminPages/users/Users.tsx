import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAdminAllUser } from "../../../querys/admin/adminQuery";
import { FaRegTrashCan } from "react-icons/fa6";
import { deleteUser } from "../../../querys/userQuery";
import { toast } from "react-toastify";
import { DropDown, Modal } from "../../../components/component";
import { AdminPagination } from "../adminPages";

const UsersTable = () => {
  const itemsperpage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useAdminAllUser(currentPage, itemsperpage);
  const users = data?.data?.data;
  const queryClient = useQueryClient();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [deleteSelect, setDelectSelect] = useState("");
  const modalRef = useRef(null);
  // Toggle product selection
  const toggleSelectProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  // Select or deselect all products
  const toggleSelectAll = () => {
    if (selectedProducts.length === users?.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(users?.map((product) => product?._id));
    }
  };
  const { mutate: deleteMutation } = useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: (id) => deleteUser(id),
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      modalRef.current?.close();
      queryClient.invalidateQueries("adminUsers");
    },
  });
  const handleDelete = () => {
    // deleteSelect
    deleteMutation(deleteSelect);
    // setuse((prev) => prev.filter((product) => product.id !== id));
  };
  const ImageLetter = ({ name = "" }) => {
    return (
      <>
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content w-16 rounded-full">
            <span className="text-3xl text-primary">{name?.charAt(0)}</span>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex">
          <div className=" mb-6">
            <p className="text-gray-800 text-2xl font-bold">All Users</p>
            {/* breadcrumbs */}
            <div className="breadcrumbs text-sm">
              <ul>
                <li>
                  <Link to={"/Admin"}>Admin</Link>
                </li>
                <li>
                  <Link to={"/admin"}>Dashbroad</Link>
                </li>
                <li>Users</li>
              </ul>
            </div>
          </div>
          <div className=" ms-auto flex">
            <Link to={"add"}>
              <button className="btn btn-primary">Add User</button>
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {isLoading && (
            <div className="skeleton h-96 columns-1 w-full bg-gray-200 dark:bg-white "></div>
          )}
          <table className="w-full rounded">
            <thead className="bg-gray-100 text-black">
              <tr>
                <th className=" px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === users?.length}
                    onChange={toggleSelectAll}
                    className="checkbox"
                  />
                </th>
                <th className=" px-4 py-2 text-left">UserName</th>
                <th className=" px-4 py-2 text-left">Access</th>
                <th className=" px-4 py-2 text-left">Status</th>
                <th className=" px-4 py-2 text-left">Date Added</th>
                <th className=" px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.allUsers?.map((eachUser) => (
                <tr key={eachUser?._id} className="text-gray-800 text-base">
                  {/* Checkbox */}
                  <td className=" px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(eachUser?._id)}
                      onChange={() => toggleSelectProduct(eachUser?._id)}
                      className="checkbox"
                    />
                  </td>

                  {/* Product Name */}
                  <td className=" px-4 py-2">
                    <div className="inline-flex gap-2">
                      <Link to={eachUser?._id}>
                        {eachUser?.imgUrl !== "" ? (
                          <>
                            <div className="avatar">
                              <div className="w-14 rounded-full">
                                <img src={eachUser?.imgUrl} />
                              </div>
                            </div>
                          </>
                        ) : (
                          <ImageLetter name={eachUser?.username} />
                        )}
                      </Link>

                      <div className="inline-flex flex-col">
                        <p className="text-gray-800 text-base capitalize">
                          {eachUser?.username}
                        </p>
                        <span className="text-gray-400 text-sm">
                          {eachUser?.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* SKU */}
                  <td className=" px-4 py-2">
                    <div className="flex gap-2">
                      {eachUser?.roles?.map((role) => (
                        <span className="badge  badge-primary">{role}</span>
                      ))}
                    </div>
                  </td>

                  {/* active */}
                  <td className=" px-4 py-2">
                    {eachUser?.isActive ? (
                      <span className="badge badge-success badge-outline">
                        Active
                      </span>
                    ) : (
                      <span className="badge badge-neutral">Active</span>
                    )}
                  </td>

                  {/* added */}
                  <td className=" px-4 py-2">
                    {new Date(eachUser?.createdAt).toLocaleDateString("en-GB")}
                  </td>

                  {/* Price */}

                  {/* Actions */}
                  <td className=" px-4 py-2">
                    <DropDown>
                      <li>
                        <Link
                          to={`${eachUser?._id}`}
                          className="hover:bg-gray-300 font-medium"
                        >
                          <IoEye />
                          View
                        </Link>
                      </li>
                      <li>
                        <button
                          className="hover:bg-gray-300 font-medium"
                          onClick={() => {
                            if (modalRef?.current) {
                              setDelectSelect(eachUser?._id);
                              modalRef?.current?.showModal();
                            }
                          }}
                        >
                          <FaRegTrashAlt />
                          Delete
                        </button>
                      </li>
                      {/* <button className="btn btn-sm btn-ghost rounded-full">
                      <MdModeEdit />
                    </button> */}
                    </DropDown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <AdminPagination
          currentPage={currentPage}
          setPage={setCurrentPage}
          totalPage={Math.ceil(data?.totalUsers / itemsperpage)}
        />
      </div>
      {/* modal for confirm delete */}
      <Modal modalRef={modalRef}>
        <div className="card flex justify-center flex-col gap-3 items-center">
          <div className="flex justify-center border-spacing-1 bg-red-400 w-20 rounded-full p-5">
            <span>
              <FaRegTrashCan size={30} color="white" />
            </span>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="font-bold text-xl">Delete This User!!</h3>
            <p className="py-4">Press Delete or Cancel !!</p>
          </div>

          <div className="btn-group w-full px-5 flex justify-between">
            <button
              className="btn btn-outline text-lg font-medium"
              onClick={() => {
                if (modalRef?.current) {
                  modalRef.current?.close();
                }
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-error text-lg font-medium"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UsersTable;

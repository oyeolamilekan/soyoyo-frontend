import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { createPaymentPage, deletePaymentPage, fetchPaymentPages, updatePaymentPage } from "../../api/payment_pages";
import CustomSupense from "../../components/CustomSuspense";
import DashboardContainer from "../../components/DashboardContainer";
import { Button, Form, Input } from "../../components";
import { formatNumber } from "../../utils/apps.utils";
import { FormEvent, useReducer, useRef } from "react";
import { useForm } from "../../hooks";
import Modal from "../../components/Modal";

interface PaymentPages {
  payment_url: string;
  title: string;
  slug: string;
  updated_at: string;
}

export default function PaymentPages() {
  const pageId = useRef<string>();

  const initState = { createPageModal: false, deletePageModal: false, updatePageModal: false }

  const [modals, updateModals] = useReducer((prev: typeof initState, next: Partial<typeof initState>): typeof initState => {
    return { ...prev, ...next }
  }, initState)

  const toggleCreatePaymentPageModal = () => updateModals({ createPageModal: !modals.createPageModal })

  const toggleDeletePaymentPageModal = () => updateModals({ deletePageModal: !modals.deletePageModal })

  const toggleUpdatePageModalModal = () => updateModals({ updatePageModal: !modals.updatePageModal })

  const queryClient = useQueryClient()

  const { slug } = useParams();

  const { values, onChange, resetValue, setPreview } = useForm({
    title: "",
    amount: ""
  });

  const { isLoading, isError, data } = useQuery({
    enabled: slug !== null,
    queryKey: ['payment_pages', slug],
    retry: false,
    onError: ({ response }) => {
      const { message } = response?.data;
      toast.error(message);
    },
    queryFn: () => fetchPaymentPages(slug as string)
  })

  const { isLoading: isCreating, mutateAsync } = useMutation(createPaymentPage, {
    cacheTime: Infinity,
    onSuccess({ message }) {
      toast.success(message)
      queryClient.invalidateQueries(['payment_pages', slug])
      toggleCreatePaymentPageModal();
      resetValue();
    },
    onError({ response }) {
      const { message } = response?.data;
      toast.error(message);
    }
  })

  const { isLoading: isDeleting, mutateAsync: deleteMutation } = useMutation(deletePaymentPage, {
    cacheTime: Infinity,
    onSuccess({ message }) {
      toast.success(message);
      queryClient.invalidateQueries(['payment_pages', slug]);
      toggleDeletePaymentPageModal();
      resetValue();
    },
    onError({ response }) {
      const { message } = response?.data;
      toast.error(message);
    }
  })

  const { isLoading: isUpdating, mutateAsync: updateAsync } = useMutation(updatePaymentPage, {
    cacheTime: Infinity,
    onSuccess({ message }) {
      toast.success(message);
      queryClient.invalidateQueries(['payment_pages', slug]);
      toggleUpdatePageModalModal();
      resetValue();
    },
    onError({ response }) {
      const { message } = response?.data;
      toast.error(message);
    }
  })

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { title, amount } = values
    await mutateAsync({ title, amount, slug });
  };

  const onUpdateSubmit = async (e: FormEvent) => {
    e.preventDefault();
    values.business_slug = slug
    values.page_slug = pageId.current
    await updateAsync(values)
  }

  const deletePageAction = async () => {
    const payload = {
      business_slug: slug,
      page_slug: pageId.current
    }
    await deleteMutation(payload)
  }


  return (
    <div>
      <DashboardContainer>
        <CustomSupense
          isLoading={isLoading}
          isError={isError}
        >
          <div className='flex justify-between items-center my-3 px-6'>
            <h3 className="font-bold">Pages</h3>
            <div className='flex space-x-5'>
              <Button size='non-full' onClick={() => {
                resetValue();
                toggleCreatePaymentPageModal();
              }}>Create Page</Button>
            </div>
          </div>

          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">
                  Title
                </th>
                <th className="px-6 py-3">
                  Amount
                </th>
                <th className="px-6 py-3">
                  Status
                </th>
                <th className="px-6 py-3">
                  Payment Url
                </th>
                <th className="px-6 py-3">
                </th>
              </tr>
            </thead>
            <tbody>
              {(data?.data ?? [])?.map((page: any, key: number) => (
                <tr key={key}>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize">{page?.title}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize">{formatNumber(page?.amount)}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap uppercase">{page?.status}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <a href={page?.payment_url} target="__blank__">
                      {page?.payment_url}
                    </a>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize">
                    <div className="flex space-x-5">
                      <Button onClick={() => {
                        setPreview({
                          title: page?.title,
                          amount: page?.amount
                        })
                        pageId.current = page?.slug
                        toggleUpdatePageModalModal();
                      }} variant="outline">
                        Edit
                      </Button>
                      <Button onClick={() => {
                        pageId.current = page?.slug
                        toggleDeletePaymentPageModal();
                      }}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CustomSupense>
      </DashboardContainer>
      <Modal isShown={modals.updatePageModal} onClose={toggleUpdatePageModalModal}>
        <>
          <h1 className="text-center mb-6 font-semibold text-xl">Update a Page.</h1>
          <Form onSubmit={onUpdateSubmit}>
            <Input
              showPassword={false}
              placeHolder="Page title"
              type="text"
              name="title"
              onChange={onChange}
              value={values.title}
            />
            <Input
              showPassword={false}
              placeHolder="Page amount"
              type="number"
              name="amount"
              onChange={onChange}
              value={values.amount}
            />
            <Button loading={isUpdating} disabled={isUpdating}>
              Update Page
            </Button>
          </Form>
        </>
      </Modal>
      <Modal isShown={modals.createPageModal} onClose={toggleCreatePaymentPageModal}>
        <>
          <h1 className="text-center mb-6 font-semibold text-xl">Create a Page.</h1>
          <Form onSubmit={onSubmit}>
            <Input
              showPassword={false}
              placeHolder="Page title"
              type="text"
              name="title"
              onChange={onChange}
              value={values.title}
            />
            <Input
              showPassword={false}
              placeHolder="Page amount"
              type="number"
              name="amount"
              onChange={onChange}
              value={values.amount}
            />
            <Button loading={isCreating} disabled={isCreating}>
              Create Page
            </Button>
          </Form>
        </>
      </Modal>
      <Modal isShown={modals.deletePageModal} onClose={toggleDeletePaymentPageModal}>
        <>
          <p className="text-center my-5">Are you sure you want to delete this page?</p>
          <div className='flex flex-col md:flex-row md:space-x-4 md:space-y-0 space-y-2 mt-5'>
            <Button onClick={deletePageAction} loading={isDeleting} disabled={isDeleting}>
              Yes
            </Button>
            <Button onClick={toggleDeletePaymentPageModal} variant='outline'>
              No, take me back.
            </Button>
          </div>
        </>
      </Modal>
    </div>
  )
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createBusiness, fetchBusiness } from "../../api/business";
import { useNavigate } from "react-router"
import CustomSupense from "../../components/CustomSuspense";
import { FormEvent, useReducer } from "react";
import { useForm } from "../../hooks";
import Modal from "../../components/Modal";
import { Button, Form } from "../../components";
import { Input } from "../../components/";

interface Business {
  title: string;
  slug: string;
  updated_at: string;
  created_at: string;
}

export default function Business() {
  const initState = { createAppModal: false }

  const [modals, updateModals] = useReducer((prev: typeof initState, next: Partial<typeof initState>): typeof initState => {
    return { ...prev, ...next }
  }, initState)

  const toggleCreateAppModal = () => updateModals({ createAppModal: !modals.createAppModal })

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const { isLoading, isError, data } = useQuery({
    queryKey: ['business'],
    retry: false,
    onError: ({ response }) => {
      const { message } = response?.data;
      toast.error(message);
    },
    queryFn: fetchBusiness
  })

  const { values, onChange, resetValue } = useForm({
    title: ""
  });

  const { isLoading: isCreating, mutateAsync } = useMutation(createBusiness, {
    cacheTime: Infinity,
    onSuccess({ message }) {
      toast.success(message);
      toggleCreateAppModal();
      resetValue();
      queryClient.invalidateQueries(['business'])
    },
    onError(err: any) {
      const { message } = err.response?.data;
      toast.error(message);
    },
  })

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { title } = values
    await mutateAsync({ title });
  };

  const pushToPage = (slug: string) => navigate(`/app/payment_page/${slug}`)

  return (
    <div>
      <CustomSupense
        isLoading={isLoading}
        isError={isError}
      >
        <div className="w-72 mx-auto">
          <h2 className="text-center font-bold my-3">Your businesses</h2>
          {data?.data.map((businessObj: Business, key: number) => {
            return <div key={key} onClick={() => pushToPage(businessObj.slug)}>
              <div className="p-5 bg-white shadow my-5 rounded text-black text-center cursor-pointer">
                {businessObj.title}
              </div>
            </div>
          })}
        </div>
      </CustomSupense>
      <div className='fixed bottom-12 right-10 cursor-pointer rounded bg-black text-white px-9 py-3 hover:shadow' onClick={toggleCreateAppModal}>
        Create App
      </div>

      <Modal isShown={modals.createAppModal} onClose={toggleCreateAppModal}>
        <>
          <h1 className="text-center mb-6 font-semibold text-xl">Create an app.</h1>
          <Form onSubmit={onSubmit}>
            <Input
              showPassword={false}
              placeHolder="Business Name"
              type="text"
              name="title"
              onChange={onChange}
              value={values.title}
            />
            <Button loading={isCreating} disabled={isCreating}>
              Create App
            </Button>
          </Form>
        </>
      </Modal>
    </div>
  )
}

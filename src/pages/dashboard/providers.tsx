import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useCallback, useMemo, useReducer, useRef, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import CustomSupense from "../../components/CustomSuspense";
import DashboardContainer from "../../components/DashboardContainer";
import Modal from "../../components/Modal";
import { useForm } from "../../hooks";
import { Input } from "../../components/";
import Select from "../../components/Select";
import { addProvider, editProvider, fetchAllPaymentProviders, fetchPaymentProviders, removeProvider } from "../../api/providers";
import { Button } from "../../components";
import { formatDate } from "../../utils/apps.utils";

export default function Providers() {
    const queryClient = useQueryClient()

    const [currentProviderId, setCurrentProviderId] = useState<string>('')

    const initState = { editModal: false, deleteModal: false, createModal: false }

    const [modals, updateModals] = useReducer((prev: typeof initState, next: Partial<typeof initState>): typeof initState => {
        return { ...prev, ...next }
    }, initState)

    const toggleCreateModal = () => updateModals({ createModal: !modals.createModal })

    const toggleEditModal = () => updateModals({ editModal: !modals.editModal })

    const toggleDeleteModal = () => updateModals({ deleteModal: !modals.deleteModal })

    const { slug } = useParams();

    const { isLoading, isError, data } = useQuery({
        enabled: slug !== null,
        queryKey: ['providers', slug],
        retry: false,
        onError: ({ response }) => {
            const { message } = response?.data;
            toast.error(message);
        },
        queryFn: () => fetchPaymentProviders(slug as string)
    })

    const { isLoading: isProviderLoading, isError: isProviderError, data: allProvider } = useQuery({
        enabled: slug !== null,
        queryKey: ['all_providers', slug],
        retry: false,
        onError: ({ response }) => {
            const { message } = response?.data;
            toast.error(message);
        },
        queryFn: () => fetchAllPaymentProviders()
    })

    const { isLoading: loading, mutateAsync } = useMutation(addProvider, {
        cacheTime: Infinity,
        onSuccess({ message }) {
            toast.success(message)
            queryClient.invalidateQueries(['providers', slug])
            queryClient.invalidateQueries(['all_providers', slug])
            toggleCreateModal();
            resetValue();
        },
        onError({ response }) {
            const { message } = response?.data;
            toast.error(message);
        }
    })

    const { isLoading: editLoading, mutateAsync: editMutation } = useMutation(editProvider, {
        cacheTime: Infinity,
        onSuccess({ message }) {
            toast.success(message)
            queryClient.invalidateQueries(['providers', slug])
            queryClient.invalidateQueries(['all_providers', slug])
            toggleEditModal();
            resetValue();
        },
        onError({ response }) {
            const { message } = response?.data;
            toast.error(message);
        }
    })

    const { isLoading: removeProviderLoading, mutateAsync: removeProviderMutate } = useMutation(removeProvider, {
        cacheTime: Infinity,
        onSuccess({ message }) {
            toast.success(message)
            queryClient.invalidateQueries(['providers', slug])
            queryClient.invalidateQueries(['all_providers', slug])
            toggleDeleteModal()
            resetValue();
        },
        onError({ response }) {
            const { message } = response?.data;
            toast.error(message);
        }
    })

    const { values, onChange, resetValue, setPreview } = useForm({
        public_key: "",
        provider_title: "",
    });

    const providers = useCallback((filterWithCurrentValue: boolean = false) => {
        const currentProviderTitle: [string] = (data?.data ?? []).map((provider: any) => provider.title)
        const cleanedProvider = (allProvider?.data ?? []).map((provider: any) => {
            return {
                value: provider.title,
                name: provider.name
            }
        })
        const value = (cleanedProvider).filter((provider: any) => {
            if (!currentProviderTitle.includes(filterWithCurrentValue ? provider.value : '')) {
                return provider
            }
        })
        return value
    }, [data?.data, removeProviderLoading, loading])

    const addProviderOnSubmit = async (e: FormEvent) => {
        e.preventDefault();
        values.slug = slug;
        await mutateAsync(values)
    }

    const editProviderOnSubmit = async (e: FormEvent) => {
        e.preventDefault();
        values.slug = slug
        editMutation(values)
    }

    const deleteProviderAction = async () => {
        const payload = {
            slug,
            currentProviderId
        }
        await removeProviderMutate(payload)
    }

    const deleteProvider = (provider_id: string) => {
        setCurrentProviderId(provider_id)
        toggleDeleteModal()
    }

    return (
        <DashboardContainer>
            <CustomSupense
                isLoading={isLoading && isProviderLoading}
                isError={isError && isProviderError}
            >
                <div className='flex justify-between items-center my-3 px-6'>
                    <h3 className='font-bold'>Providers.</h3>
                    <div className='flex space-x-5'>
                        <Button size='non-full' onClick={() => {
                            resetValue();
                            toggleCreateModal();
                        }}>Add Provider</Button>
                    </div>
                </div>

                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">
                                Name
                            </th>
                            <th className="px-6 py-3">
                                Title
                            </th>
                            <th className="px-6 py-3">
                                Created
                            </th>
                            <th className="px-6 py-3">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.map((provider: any) => (
                            <tr>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize">{provider?.name}</td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize">{provider?.title}</td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize">{formatDate(provider?.created_at)}</td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize">
                                    <div className="flex space-x-5">
                                        <Button onClick={() => {
                                            setPreview({
                                                public_key: provider?.public_key,
                                                provider_title: provider?.title
                                            })
                                            toggleEditModal()
                                        }} variant="outline">
                                            Edit
                                        </Button>
                                        <Button onClick={() => deleteProvider(provider?.id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Modal isShown={modals.createModal} onClose={toggleCreateModal}>
                    <>
                        <h2 className='text-xl text-center mb-6 font-semibold'>Add Provider.</h2>
                        <form onSubmit={addProviderOnSubmit}>
                            <Input
                                label='Public Key'
                                showPassword={false}
                                placeHolder="Public Key"
                                type="text"
                                name="public_key"
                                onChange={onChange}
                                value={values.public_key}
                                required={true}
                            />
                            <Select
                                label='Providers'
                                name={"provider_title"}
                                onChange={onChange}
                                value={values.provider_title}
                                options={providers(true)}
                                required={true}
                            />
                            <Button loading={loading} disabled={loading}>
                                Add Provider
                            </Button>
                        </form>
                    </>
                </Modal>

                <Modal isShown={modals.editModal} onClose={toggleEditModal}>
                    <>
                        <h2 className='text-xl text-center mb-6 font-semibold'>Edit Provider.</h2>
                        <form onSubmit={editProviderOnSubmit}>
                            <Input
                                label='Public Key'
                                showPassword={false}
                                placeHolder="Public Key"
                                type="text"
                                name="public_key"
                                onChange={onChange}
                                value={values.public_key}
                                required={true}
                            />
                            <Select
                                label='Providers'
                                name={"provider_title"}
                                onChange={onChange}
                                value={values.provider_title}
                                options={providers()}
                                required={true}
                                disabled
                            />
                            <Button loading={editLoading} disabled={editLoading}>
                                Edit Provider
                            </Button>
                        </form>
                    </>
                </Modal>

                <Modal isShown={modals.deleteModal} onClose={toggleDeleteModal}>
                    <>
                        <p className="text-center my-5">Are you want to delete this payment integration.</p>
                        <div className='flex flex-col md:flex-row md:space-x-4 md:space-y-0 space-y-2 mt-5'>
                            <Button onClick={deleteProviderAction} loading={removeProviderLoading} disabled={removeProviderLoading}>
                                Yes
                            </Button>
                            <Button onClick={toggleDeleteModal} variant='outline'>
                                No, take me back.
                            </Button>
                        </div>
                    </>
                </Modal>
            </CustomSupense>
        </DashboardContainer>
    )
}
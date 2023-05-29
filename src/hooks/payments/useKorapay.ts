/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'

/* eslint-disable camelcase */
export interface ErrorType {
    type: string
}

export interface ConfigProps {
    public_key: string
    amount: string | number
    currency?: string
    customer?: {
        [key: string]: any
    }
    onSuccess: (response: any) => void
    onError?: (response: any) => void
    onClose?: () => void
}


declare const window: Window &
    typeof globalThis & {
        Korapay: any
    }

const loadedScripts: {
    src?: string
} = {}

type ScriptStatusType = {
    loaded: boolean
    error: boolean
}

const koraJS = 'https://korablobstorage.blob.core.windows.net/modal-bucket/korapay-collections.min.js'

const useKorapy = (props: ConfigProps) => {
    const [state, setState] = useState<ScriptStatusType>({
        loaded: false,
        error: false
    })

    useEffect(() => {
        const scriptTag = document.getElementById('koraScript')
        const scriptSrc = scriptTag && scriptTag.getAttribute('src')

        if (scriptSrc)
            return setState({
                loaded: true,
                error: false
            })

        loadedScripts.src = koraJS
        const script = document.createElement('script')
        script.id = 'koraScript'
        script.type = 'application/javascript'
        script.src = koraJS
        script.async = true

        const onScriptLoad = () => {
            setState({
                loaded: true,
                error: false
            })
        }

        const onScriptError = () => {
            delete loadedScripts.src

            setState({
                loaded: true,
                error: true
            })

            throw new Error('Unable to load Basqet pay modal')
        }

        script.addEventListener('load', onScriptLoad)
        script.addEventListener('complete', onScriptLoad)
        script.addEventListener('error', onScriptError)

        document.body.appendChild(script)

        return () => {
            script.removeEventListener('load', onScriptLoad)
            script.removeEventListener('complete', onScriptLoad)
            script.removeEventListener('error', onScriptError)
        }
    }, [])

    const handlePayment = () => {
        if (state.error) throw new Error('Unable to load Basqet pay modal')
        if (state.loaded) {
            const data = {
                ...props,
                key: props.public_key
            }
            // @ts-ignore
            delete data.public_key;
            const basqet =
                window.Korapay &&
                window.Korapay.initialize(data)
            return basqet
        }
    }
    return handlePayment
}

export default useKorapy
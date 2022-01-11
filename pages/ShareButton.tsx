import { useState, useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const ShareButton = ({
    label,
    text,
    title,
}: {
    label: string
    text: string
    title: string
}) => {
    const [nativeShare, setNativeShare] = useState(false)
    useEffect(() => {
        if (navigator.share) {
            setNativeShare(true)
        }
    }, [])

    if (!nativeShare) {
        return (
            <CopyToClipboard text={title + ' ' + text}>
                <span>{label}</span>
            </CopyToClipboard>
        )
    }

    const url = document.location.href
    const shareDetails = { url, title, text }

    const handleSharing = async () => {
        try {
            await navigator.share(shareDetails)
        } catch (error) {
            console.log(`Oops! I couldn't share to the world because: ${error}`)
        }
    }
    return (
        <button className="btn btn-outline m-2" onClick={handleSharing}>
            {label}
        </button>
    )
}
export default ShareButton

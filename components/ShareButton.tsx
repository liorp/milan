import { useState, useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const ShareButton = ({
    label,
    text,
    title,
    onClick,
}: {
    label: string
    text: string
    title: string
    onClick: (text: string, success: boolean) => void
}) => {
    const [nativeShare, setNativeShare] = useState(false)
    useEffect(() => {
        if (navigator.share) {
            setNativeShare(true)
        }
    }, [])

    if (!nativeShare) {
        return (
            <CopyToClipboard text={title + ' ' + text} onCopy={onClick}>
                <span>{label}</span>
            </CopyToClipboard>
        )
    }

    const url = document.location.href
    const shareDetails = { url, title, text }

    const handleSharing = async () => {
        try {
            await navigator.share(shareDetails)
            onClick(text, true)
        } catch (error) {
            console.log(`Oops! I couldn't share to the world because: ${error}`)
            onClick(text, false)
        }
    }
    return (
        <button className="btn btn-outline m-2" onClick={handleSharing}>
            {label}
        </button>
    )
}
export default ShareButton

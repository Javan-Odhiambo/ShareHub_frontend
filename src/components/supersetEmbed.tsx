import React, { useEffect, useRef } from 'react'
import { embedDashboard } from "@superset-ui/embedded-sdk";
import { dashboardId, fetchGuestTokenFromBackend, getToken, supersetUrl } from "@/utils/embedSuperset";
const SupersetEmbed = ({ embed_id }: { embed_id?: string }) => {
    const dashboardRef = useRef(null);

    useEffect(() => {
        const embedSuperset = async () => {
            const container = document.getElementById("superset-container")

            container && embedDashboard({
                // TODO: Add embed ID
                id: embed_id,  // given by the Superset embedding UI
                supersetDomain: supersetUrl,
                mountPoint: container, // html element in which iframe render
                fetchGuestToken: () => fetchGuestTokenFromBackend(),
                dashboardUiConfig: {
                    hideTitle: false,
                    hideChartControls: true,
                    hideTab: true,
                    filters: {
                        expanded: true,
                    },
                }
            });
        }
        console.log("ref: ", dashboardRef.current)
        if (dashboardRef.current !== null) {
            console.log("embeding")
            embedSuperset()

            const iframe = document.querySelector("iframe")
            console.log(iframe);

            if (iframe) {
                iframe.style.width = '100%'; // Set the width as needed
                iframe.style.minHeight = '70vw'; // Set the height as needed
                iframe.style.overflow = 'hidden'
                iframe.style.border = "0"
            }
        } else {
            console.log("Not embeding")
        }
    }, [embed_id])
    return (
        <div id="superset-container" ref={dashboardRef} className="w-full">
        </div>
    )
}

export default SupersetEmbed

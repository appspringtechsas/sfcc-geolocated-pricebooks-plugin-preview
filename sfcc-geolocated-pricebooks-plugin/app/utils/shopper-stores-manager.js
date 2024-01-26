import { getAppOrigin } from '@salesforce/pwa-kit-react-sdk/utils/url'

class ShopperStores {
    constructor(organizationId, siteId) {
        this.baseUrl = `${getAppOrigin()}/mobify/proxy/api/store/shopper-stores/v1/organizations/${organizationId}/`
        this.siteId = siteId
    }

    searchStores(token, params, callback) {
        let fetchUrl = `${this.baseUrl}store-search?siteId=${this.siteId}`
        if (params) {
            fetchUrl = `${fetchUrl}&${params.toString()}`
        }

        fetch(fetchUrl, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(async (res) => {
                const result = await res.json()
                callback(result)
            })
            .catch(error => console.error(error))
    }
}

export default ShopperStores
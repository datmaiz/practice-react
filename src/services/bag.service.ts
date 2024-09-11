import { IBag, IBagRequest } from '@/common/interfaces'
import { axiosClient, randomId } from '@/utils'

export const createBag = async (bag: IBagRequest) => {
	return (await axiosClient.post<IBag>('/bags', { ...bag, id: randomId() })).data
}

export const getBagsByUserId = async (userId: string) => {
	return (await axiosClient.get<IBag[]>('/bags', { params: { userId } })).data
}

export const deleteBagById = async (bagId: string) => {
	return (await axiosClient.delete<IBag>(`/bags/${bagId}`)).data
}

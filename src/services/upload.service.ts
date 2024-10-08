import axios from 'axios'

import { IUpload } from '@/common/interfaces'
import { cloudName, uploadAssetsName } from '@/utils/constants'

export const uploadImage = async (file: File): Promise<IUpload> => {
	const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

	const formData = new FormData()
	formData.append('file', file)
	formData.append('upload_preset', uploadAssetsName)
	const response = await axios.post<IUpload>(url, formData)
	return response.data
}

export const uploadImages = async (files: File[]): Promise<IUpload[]> => {
	const responses = await Promise.allSettled(files.map(file => uploadImage(file)))
	const urls: IUpload[] = []
	responses.forEach(response => {
		if (response.status === 'fulfilled') {
			urls.push(response.value)
		}
	})

	return urls
}

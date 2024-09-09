import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { Button, Input, Text } from '@/components/elements'
import { register as registerUser } from '@/services/user.service'
import { toast } from 'react-toastify'

const schema = z
	.object({
		username: z.string().trim().min(1, 'User can not be empty').toLowerCase(),
		email: z.string().email({ message: 'email is not valid' }).min(1, 'Email can not be empty'),
		password: z
			.string()
			.min(8, 'Password must be at least 8 characters')
			.max(32, 'Password must be less than 32 characters'),
		confirm: z.string(),
	})
	.refine(data => data.password === data.confirm, {
		message: 'Confirm is not same as password',
		path: ['confirm'],
	})

type DataRegisterForm = z.infer<typeof schema>

const RegisterPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<DataRegisterForm>({ resolver: zodResolver(schema) })
	const navigate = useNavigate()

	const handleSubmitForm = async (data: DataRegisterForm) => {
		const { email, password, username } = data
		const response = await registerUser({ email, password, username })
		if ('data' in response) {
			toast.success(response.message)
			navigate('/auth/login')
		} else {
			toast.error(response.error)
		}
	}

	return (
		<div className='w-full shadow-xl py-[35px] px-[25px] rounded-lg'>
			<Text
				variant={'primary-bold'}
				level={'h2'}
				className='text-center pt-[25px]'
			>
				REGISTER
			</Text>
			<form
				onSubmit={handleSubmit(handleSubmitForm)}
				className='flex flex-col gap-6'
			>
				<Input
					variant={'primary'}
					placeholder='Your username'
					label='Username'
					error={errors.username?.message}
					register={register('username')}
				/>
				<Input
					variant={'primary'}
					placeholder='Your email'
					label='Email'
					error={errors.email?.message}
					register={register('email')}
				/>
				<Input
					variant={'primary'}
					placeholder='Your password'
					label='Password'
					error={errors.password?.message}
					register={register('password')}
					type='password'
				/>
				<Input
					variant={'primary'}
					placeholder='Confirm your password'
					label='Confirm'
					error={errors.confirm?.message}
					register={register('confirm')}
					type='password'
				/>
				<Button loading={isSubmitting}>register</Button>
				<Link
					className='w-full text-center hover:underline'
					to={'/auth/login'}
				>
					<Text
						variant={'primary-regular'}
						level={'h8'}
					>
						Already have an account?
					</Text>
				</Link>
			</form>
		</div>
	)
}

export default RegisterPage

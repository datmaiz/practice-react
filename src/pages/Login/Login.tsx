import { Button, Input, Text } from '@/components/elements'
import { login } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

const schema = z.object({
	email: z.string().email("Email is not match email's pattern"),
	password: z.string(),
})

type DataLoginForm = z.infer<typeof schema>

const LoginPage = () => {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm<DataLoginForm>({ resolver: zodResolver(schema) })
	const navigate = useNavigate()
	const [params] = useSearchParams()

	const handleSubmitForm = async (data: DataLoginForm) => {
		const response = await login(data.email, data.password)
		if ('data' in response) {
			navigate('/admin')
		} else {
			navigate(`/auth/login?emailError=${response.error.email}&passwordError=${response.error.password}`)
			response.error.notification && toast.error(response.error.notification)
		}
	}

	return (
		<div className='w-full shadow-xl py-[35px] px-[25px] rounded-lg'>
			<Text
				variant={'primary-bold'}
				level={'h2'}
				className='text-center pt-[25px]'
			>
				LOG IN
			</Text>
			<form
				onSubmit={handleSubmit(handleSubmitForm)}
				className='flex flex-col gap-6'
			>
				<Input
					variant={'primary'}
					placeholder='Your email'
					label='Email'
					type='email'
					register={register('email')}
					error={params.get('emailError') ?? errors.email?.message ?? ''}
				/>
				<Input
					variant={'primary'}
					placeholder='Your password'
					label='Password'
					type='password'
					register={register('password')}
					error={params.get('passwordError') ?? ''}
				/>
				<Button loading={isSubmitting}>log in</Button>
				<Link
					className='w-full text-center hover:underline'
					to={'/auth/register'}
				>
					<Text
						variant={'primary-regular'}
						level={'h8'}
					>
						Don't have account?
					</Text>
				</Link>
			</form>
		</div>
	)
}

export default LoginPage

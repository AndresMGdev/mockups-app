'use client'

import Image from "next/image";
import { User } from '../types/user';
import Modal from "./Modal";
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

interface ProfileProps extends User {
    onConfirm?: () => void;
    onCancel?: () => void;
}

const Profile: React.FC<ProfileProps> = ({ email, name, lastname, identification, typeId, phone, address }) => {
    const router = useRouter();
    const [userData, setUserData] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('authUser');
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
        }
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<User>();

    const onSubmit = handleSubmit((data) => {
        const authUser: User | null = JSON.parse(localStorage.getItem('authUser') || 'null');
        
        if (authUser) {
            const users: { [key: string]: User } = {};
        
            for (const key in localStorage) {
                try {
                    const user = JSON.parse(localStorage.getItem(key) || 'null');
                    if (user && user.email) {
                        users[key] = user;
                    }
                } catch (e) {
                    console.error(e)
                }
            }
        
            if (users[authUser.email]) {
                users[authUser.email].password = data.password;
        
                localStorage.setItem(authUser.email, JSON.stringify(users[authUser.email]));
            } else {
                console.log('Copia de authUser no encontrada en el array.');
            }
        } else {
            console.log('authUser no está disponible en el localStorage.');
        }
    });

    const handleOpenModal = () => {
        const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
        modal.showModal();
    };

    const handleOpenModalForm = () => {
        const modal = document.getElementById('my_modal_2') as HTMLDialogElement;
        modal.showModal();
    };

    const handleConfirm = () => {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            const users = JSON.parse(storedUsers);
            const updatedUsers = users.filter((user: User) => user.identification !== identification);
            localStorage.setItem('users', JSON.stringify(updatedUsers));

            localStorage.removeItem('authUser');
        }

        const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
        modal.close();
        setTimeout(() => {
            router.push('/auth/login');
        }, 1000)
    };

    const handleCancel = () => {
        console.log('Cancelled');
        const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
        modal.close();
    };

    const handleCancelForm = () => {
        console.log('Cancelled');
        const modal = document.getElementById('my_modal_2') as HTMLDialogElement;
        modal.close();
    };

    return (
        <>
            <div className="flex flex-col">
                <div className="overflow-y-auto sm:p-0 pt-4 pr-4 pb-20 pl-4">
                    <div className="flex justify-center items-end text-center min-h-screen sm:block">
                        <div className="bg-gray-500 transition-opacity bg-opacity-75"></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">​</span>
                        <div className="inline-block text-left bg-gray-900 rounded-lg overflow-hidden align-bottom transition-all transform shadow-2xl sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
                            <div className="items-center w-full mr-auto ml-auto relative max-w-7xl md:px-12 lg:px-24">
                                <div className="grid grid-cols-1">
                                    <div className="mt-4 mr-auto mb-4 ml-auto bg-gray-900 max-w-lg">
                                        <div className="flex flex-col items-center pt-6 pr-6 pb-6 pl-6">
                                            <Image width={100} height={100} src="/colombia.png" alt="bandera de colombia" />
                                            <p className="mt-8 text-2xl font-semibold leading-none text-white tracking-tighter lg:text-3xl">{`${name} ${lastname}`}</p>
                                            <p className="mt-3 text-base leading-relaxed text-center text-gray-200">Email: {email}</p>
                                            <p className="mt-3 text-base leading-relaxed text-center text-gray-200">{typeId}: {identification}</p>

                                            <p className="mt-3 text-base leading-relaxed text-center text-gray-200">Number Phone: {phone}</p>
                                            <p className="mt-3 text-base leading-relaxed text-center text-gray-200">Address: {address}</p>

                                            <div className="w-full mt-6 flex justify-between">
                                                <button className="btn btn-info">Update</button>
                                                <button className="btn btn-error" onClick={handleOpenModal}>Delete Account</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card w-full bg-neutral text-neutral-content">
                    <form className="card-body items-center text-center" onSubmit={onSubmit}>
                        <h2 className="card-title">Change Password!</h2>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 8,
                                        message: 'Password must have at least 8 characters',
                                    },
                                })}
                                type="password"
                                placeholder="Password"
                                className={`input input-bordered ${errors.password ? 'input-error' : ''}`}
                            />
                            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input
                                {...register('confirmPassword', {
                                    required: 'Confirm Password is required',
                                    validate: (value) =>
                                        value === watch('password') || 'Passwords do not match',
                                })}
                                type="password"
                                placeholder="Confirm Password"
                                className={`input input-bordered ${errors.confirmPassword ? 'input-error' : ''}`}
                            />
                            {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
                        </div>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary" onClick={handleOpenModalForm}>Change Password</button>
                        </div>
                        <Modal
                            id="my_modal_2"
                            title="Are you sure you want to change your password?"
                            message="Remember not to use passwords that are too difficult to remember, as this will make it very easy to return!"
                            onCancel={handleCancelForm}
                        />
                    </form>
                </div>
            </div>

            <Modal
                id="my_modal_1"
                title="You are about to delete your account"
                message="Are you sure you want to delete it? The data will be permanently deleted and cannot be recovered."
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </>
    );
};

export default Profile;

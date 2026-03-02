import Contrat from './Components/Contrat/Contrat'
import ProfileForm from './Components/ProfileForm/ProfileForm'
import ChangePass from './Components/ChangePass/ChangePass'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs'
import { Card } from '@/Components/ui/card'

export default function Profile() {
    return (
        <Card className="w-full bg-white shadow-sm border border-slate-100 rounded-xl overflow-hidden mt-5">
            <div className="p-6">
                <Tabs defaultValue="profile" className="flex flex-col md:flex-row gap-6">
                    <TabsList className="flex md:flex-col h-auto bg-transparent border-b md:border-b-0 md:border-r border-slate-200 justify-start items-start gap-2 p-0 rounded-none w-full md:w-56 overflow-x-auto">
                        <TabsTrigger
                            value="profile"
                            className="w-full justify-start py-2.5 px-4 font-normal data-[state=active]:bg-primary-blue/10 data-[state=active]:text-primary-blue data-[state=active]:font-medium data-[state=active]:shadow-none hover:bg-slate-50 border-l-2 border-transparent data-[state=active]:border-primary-blue rounded-none"
                        >
                            Profile
                        </TabsTrigger>
                        <TabsTrigger
                            value="payroll"
                            className="w-full justify-start py-2.5 px-4 font-normal data-[state=active]:bg-primary-blue/10 data-[state=active]:text-primary-blue data-[state=active]:font-medium data-[state=active]:shadow-none hover:bg-slate-50 border-l-2 border-transparent data-[state=active]:border-primary-blue rounded-none"
                        >
                            Payroll
                        </TabsTrigger>
                        <TabsTrigger
                            value="security"
                            className="w-full justify-start py-2.5 px-4 font-normal data-[state=active]:bg-primary-blue/10 data-[state=active]:text-primary-blue data-[state=active]:font-medium data-[state=active]:shadow-none hover:bg-slate-50 border-l-2 border-transparent data-[state=active]:border-primary-blue rounded-none"
                        >
                            Security
                        </TabsTrigger>
                    </TabsList>

                    <div className="flex-1 min-h-[500px]">
                        <TabsContent value="profile" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                            <ProfileForm />
                        </TabsContent>

                        <TabsContent value="payroll" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                            <Contrat />
                        </TabsContent>

                        <TabsContent value="security" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                            <ChangePass />
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </Card>
    )
}

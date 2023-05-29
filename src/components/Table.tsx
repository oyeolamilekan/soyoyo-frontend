import { formatDate } from "../utils/apps.utils";
import { Button } from "./Button";

export default function Table({ headings = [], data = [], actions = [] }: Proptypes) {
    return (
        <div className="overflow-x-auto p-5">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-800 uppercase bg-gray-50 dark:text-gray-400">
                    <tr>
                        {headings.map((heading, tableId) => {
                            return <th key={`${tableId}-heading`} className="px-6 py-3">
                                <div className={'flex items-center '}>
                                    <span>{heading.title}</span>
                                </div>
                            </th>
                        })}
                        {actions.length > 0 ? <th align="left"></th> : null}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row: any, index: number) => <tr key={index} className="mt-2">
                        {headings.map((data: any, index: number) => {
                            return <td className={`px-6 py-4 text-black ${data.customClass}`} key={`${data.key}${index}`}>
                                <span className={data?.innerClass}>
                                    {data.key === 'created_at' ? formatDate(row[data.key]) : row[data.key]}
                                </span>
                            </td>
                        })}
                        {actions?.length ? (
                            <td className="flex px-6 py-4 space-x-3">
                                {actions?.map((data: any, index: number) => 
                                    <Button onClick={() => data?.action(row['id'])} customClass={'max-w-[5rem]'}>
                                        {data?.title}
                                    </Button>
                                )}
                            </td>) : null}
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}

interface Proptypes {
    headings: Array<any>;
    data: Array<any>,
    actions: Array<any>,
}
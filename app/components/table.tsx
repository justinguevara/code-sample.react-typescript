import React, { useEffect, useState } from 'react';
import UserServiceFactory from '~/factories/UserServiceFactory';
import type { UserRecordType, UserServiceInterface, UserRecordsWrapper, onClickEventListener} from '~/types/types';

export default function Table({ pageSize }: { pageSize: number }): React.JSX.Element {
  const [page, setPage] = useState<number>(1);
  const [rows, setRows] = useState<UserRecordType[]>([]);
  const [totalRowCount, setTotalRowCount] = useState<number>(1);
  const [isUiLoading, setisUiLoading] = useState<boolean>(true);

  useEffect(function () {
      (async function () {
        try {
          setisUiLoading(true);
          const results: UserRecordsWrapper = await userService.getUsers(page);
          setRows(results.results);
          setTotalRowCount(results.count);
        } catch (error: any) {
          console.error('Could not retrieve users.');
          console.error(error);
        } finally {
          setisUiLoading(false);
        }
      })();
    }, 
    [ page ]);

  const userService: UserServiceInterface = UserServiceFactory.create(pageSize);

  return (
    <>
      <TableContent rows={rows} />
      <TableControls
        isUiLoading={isUiLoading}
        totalRowCount={totalRowCount}
        page={page}
        setPage={setPage}
        pageSize={pageSize}/>
    </>
  );
}

function TableControls(
  {
    isUiLoading,
    totalRowCount,
    page,
    setPage,
    pageSize
  }:
  {
    isUiLoading: boolean
    totalRowCount: number
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
    pageSize: number
  }
  ): React.JSX.Element {
  const lastPage: number = totalRowCount === 0 ? 1 : Math.ceil(totalRowCount / pageSize);
  const isLastPage: boolean = page === lastPage;
  const isFirstPage: boolean = page === 1;

  const handleFirstPageButtonOnClick: onClickEventListener = function (
      event: React.MouseEvent<HTMLButtonElement>): void {
      setPage(1);
    };
  const handlePreviousPageButtonOnClick: onClickEventListener = function (
    event: React.MouseEvent<HTMLButtonElement>): void {
    let nextPage: number = 1;
    if (page > 1) {
      nextPage = page - 1;
    }
    setPage( nextPage );
  };
  const handleNextPageButtonOnClick: onClickEventListener = function (
    event: React.MouseEvent<HTMLButtonElement>): void {
    setPage( page + 1 );
  };
  const handleLastPageButtonOnClick: onClickEventListener = function (
    event: React.MouseEvent<HTMLButtonElement>): void {
    setPage( lastPage );
  };

  const isDisableFirstPageButton: boolean = isUiLoading || isFirstPage;
  const isDisablePreviousPageButton : boolean = isUiLoading || isFirstPage;
  const isDisableNextPageButton: boolean  = isUiLoading || isLastPage;
  const isDisableLastPageButton: boolean  = isUiLoading || isLastPage;

  return (
    <section>
      <button
        onClick={handleFirstPageButtonOnClick}
        disabled={isDisableFirstPageButton}>
        first
      </button>
      <button
        onClick={handlePreviousPageButtonOnClick}
        disabled={isDisablePreviousPageButton}>
        previous
      </button>
      <button
        onClick={handleNextPageButtonOnClick}
        disabled={isDisableNextPageButton}>
        next
      </button>
      <button
        onClick={handleLastPageButtonOnClick}
        disabled={isDisableLastPageButton}>
        last
      </button>
    </section>
  );
}

function TableContent(
  { rows }:
  { rows: UserRecordType[] }
  ): React.JSX.Element {
  const tableRowsJsx: React.JSX.Element[] = [];
  for (let i = 0; i < rows.length; i++) {
    tableRowsJsx.push((
      <TableRow
        lastName={rows[i].lastName}
        firstName={rows[i].firstName}
        id={rows[i].id}/>
    ));
  }

  return (
    <table>
      <TableHeaderRow/>
      <tbody>
        {tableRowsJsx}
      </tbody>
    </table>
  );
};

function TableHeaderRow({}): React.JSX.Element {
  return (
    <thead>
      <tr>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
      </tr>
    </thead>
  );
};

function TableRow(
  { id, firstName, lastName }:
  {
    id: number;
    firstName: string;
    lastName: string;
  }
  ): React.JSX.Element {
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
    </tr>
  );
};
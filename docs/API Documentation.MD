## Sock Endpoints

<details><summary>Create a Sock</summary>

```
- Endpoint path: /api/socks
- Endpoint method: POST

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):

  """
  	{
  	"photo" : string,
  	"color": string,
  	"pattern": string,
  	"size": string,
  	"type": string,
  	"fabric": string,
  	"style": string,
	"brand": string,
	"gift": boolean,
  	}
  	"""

- Response: Created Sock
- Response shape (JSON):
  """
  	{
		"id": int,
		"user_id": int
		"photo" : string,
		"color": string,
		"pattern": string,
		"size": string,
		"type": string,
		"fabric": string,
		"style": string,
		"brand": string,
		"gift": boolean,
		"match_status": string,
		"created_on": string
  	}
	"""
```
</details>
<details><summary>Delete a Sock</summary>

```
* Endpoint path: /api/socks/sock_id
* Endpoint method: DELETE
* Query parameters:
  * sock_id: sock_id

* Headers:
  * Authorization: Bearer token


* Response: deletes a sock
* Response shape (JSON):
    """
		{ 
		"deleted": bool,
		}
		"""
```
</details>

<details><summary>Get Feed</summary>

```
* Endpoint path: /api/socks
* Endpoint method: GET
* Query parameters:


* Response: List of Filtered Socks (pending and available only)
* Response shape (JSON):
    """
		[
			{ 
				"id": int,
				"user_id": int
				"photo" : string,
				"color": string,
				"pattern": string,
				"size": string,
				"type": string,
				"fabric": string,
				"style": string,
				"brand": string,
				"gift": boolean,
				"match_status": string,
				"created_on": string
			}
		]
		"""
```
</details>

<details><summary>Get Sock By User</summary>

```
* Endpoint path: /api/socks/users/user_id
* Endpoint method: GET
* Query parameters:
  * user_id: user's id

* Headers:
  * Authorization: Bearer token

* Response: Get Socks By User
* Response shape (JSON):
    """
	[
		{ 
				"id": int,
				"user_id": int
				"photo" : string,
				"color": string,
				"pattern": string,
				"size": string,
				"type": string,
				"fabric": string,
				"style": string,
				"brand": string,
				"gift": boolean,
				"match_status": string,
				"created_on": string
			}
		}
	]
		"""
```
</details>

<details><summary>Update Sock</summary>

```
* Endpoint path: /api/users/user_id/socks/sock_id
* Endpoint method: PUT
* Query parameters:
  * sock_id: view specific sock
  * user_id: id of logged in user

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
	"""
		{ 
			"photo" : string,
			"color": string,
			"pattern": string,
			"size": string,
			"type": string,
			"fabric": string,
			"style": string,
			"brand": string,
			"gift": boolean,
		}
		"""

* Response: Updated Sock Information
* Response shape (JSON):
    """
		{ 
			"id": int,
			"user_id": int
			"photo" : string,
			"color": string,
			"pattern": string,
			"size": string,
			"type": string,
			"fabric": string,
			"style": string,
			"brand": string,
			"gift": boolean,
			"match_status": string,
			"created_on": string
		}
		"""
```
</details>

<details><summary>View Sock Details</summary>

```
* Endpoint path: /api/socks/sock_id
* Endpoint method: GET
* Query parameters:
  * sock_id: the sock we're looking at


* Response: Detail view of a single sock
* Response shape (JSON):
	"""
		{ 
		"id": int,
		"user_id": int
		"photo" : string,
		"color": string,
		"pattern": string,
		"size": string,
		"type": string,
		"fabric": string,
		"style": string,
		"brand": string,
		"gift": boolean,
		"match_status": string,
		"created_on": string
		}
		"""
```
</details>

<details><summary>Change Match Status to Pending</summary>

```
* Endpoint path: /api/socks/sock_id/matches/pending
* Endpoint method: PUT
* Query parameters:
  * sock_id: the sock we're looking at

* Response: Changes Match Status to Pending on the Sock
* Response shape (JSON):
	"""
		{ 
			"id": int,
			"user_id": int
			"photo" : string,
			"color": string,
			"pattern": string,
			"size": string,
			"type": string,
			"fabric": string,
			"style": string,
			"brand": string,
			"gift": boolean,
			"match_status": string,
			"created_on": string
		}
		"""
```
</details>

<details><summary>Change Match Status to Matched</summary>

```
* Endpoint path: /api/socks/sock_id/matches/matched
* Endpoint method: PUT
* Query parameters:
  * sock_id: the sock we're looking at

* Response: Changes Match Status to matched on the Sock
* Response shape (JSON):
	"""
		{ 
			"id": int,
			"user_id": int
			"photo" : string,
			"color": string,
			"pattern": string,
			"size": string,
			"type": string,
			"fabric": string,
			"style": string,
			"brand": string,
			"gift": boolean,
			"match_status": string,
			"created_on": string
		}
		"""
```
</details>

<details><summary>Change Match Status to Available</summary>

```
* Endpoint path: /api/socks/sock_id/matches/rejected
* Endpoint method: PUT
* Query parameters:
  * sock_id: the sock we're looking at

* Response: Changes Match Status to available on the Sock
* Response shape (JSON):
	"""
		{ 
			"id": int,
			"user_id": int
			"photo" : string,
			"color": string,
			"pattern": string,
			"size": string,
			"type": string,
			"fabric": string,
			"style": string,
			"brand": string,
			"gift": boolean,
			"match_status": string,
			"created_on": string
		}
		"""
```
</details>

<details><summary>Get Unmatched Socks By User</summary>

```
* Endpoint path: /api/socks/users/user_id/unmatched
* Endpoint method: GET
* Query parameters:
  * user_id: user's id

* Headers:
  * Authorization: Bearer token

* Response: List of Only "available" and "pending" socks
* Response shape (JSON):
    """
	[
		{ 
				"id": int,
				"user_id": int
				"photo" : string,
				"color": string,
				"pattern": string,
				"size": string,
				"type": string,
				"fabric": string,
				"style": string,
				"brand": string,
				"gift": boolean,
				"match_status": string,
				"created_on": string
			}
		}
	]
		"""
```
</details>

## User Endpoints


<details><summary>Login</summary>

```

* Endpoint path: /token
* Endpoint method: POST

* Request shape (form):
  * username: string
  * password: string

* Response: Account information and a token
* Response shape (JSON):
    """
		json
    {
      "account": {
        «key»: type»,
      },
      "token": string
    }
    	"""
```
</details>

<details><summary>Logout</summary>

```

* Endpoint path: /token
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    """
		json
    true
    	"""
```

</details>

<details><summary>Get Token</summary>

```
* Endpoint path: /token
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    """
		{
			"access_token": string,
			"account": dict
		}
    	"""
```

</details>

<details><summary>Create a User</summary>

```
* Endpoint path: /api/users
* Endpoint method: POST

* Request shape (JSON):
    """
		{ 
		"first_name": string,
		"last_name": string,
		"username": string,
		"password": string,
		"password_confirmation": string,
		"email": string,
		"address": string,
		"profile_pic": string,
		}
    	"""

* Response: Created User
* Response shape (JSON):
    """
		"account": { 
		"id": number
		"first_name": string,
		"last_name": string,
		"username": string,
		"password": string,
		"password_confirmation": string,
		"email": string,
		"address": string,
		"profile_pic": string,
		"sockstar_points": number (default = 0),
		"total_pairings": number (default = 0),
		"verified": bool,
		"type": str,
		"created_on": str
		}
    	"""
```
</details>

<details><summary>Create an Admin</summary>

```
* Endpoint path: /api/users/admin
* Endpoint method: POST


* Request shape (JSON):
    """
		{ 
		"first_name": string,
		"last_name": string,
		"username": string,
		"password": string,
		"password_confirmation": string,
		"email": string,
		"address": string,
		"profile_pic": string,
		}
    	"""

* Response: Created Admin
* Response shape (JSON):
    """
		"account": { 
		"id": number
		"first_name": string,
		"last_name": string,
		"username": string,
		"password": string,
		"password_confirmation": string,
		"email": string,
		"address": string,
		"profile_pic": string,
		"sockstar_points": number (default = 0),
		"total_pairings": number (default = 0),
		"verified": bool,
		"type": str,
		"created_on": str
		}
    	"""
```
</details>

<details><summary>Delete A User</summary>

```
* Endpoint path: /api/users/user_id
* Endpoint method: DELETE
* Query parameters:
  * user_id: user_id

* Headers:
  * Authorization: Bearer token

* Response: Boolean
* Response shape (bool):
    """
		bool
    	"""
```
</details>

<details><summary>Verify A User</summary>

```
* Endpoint path: /api/users/user_id/verify
* Endpoint method: PUT
* Query parameters:
  * user_id: user_id


* Headers:
  * Authorization: Bearer token


* Response: Verified User
* Response shape (JSON):
    """
		{ 
		"id": number
		"first_name": string,
		"last_name": string,
		"username": string,
		"password": string,
		"password_confirmation": string,
		"email": string,
		"address": string,
		"profile_pic": string,
		"sockstar_points": number (default = 0),
		"total_pairings": number (default = 0),
		"verified": bool,
		"type": str,
		"created_on": str
		}
    	"""
```

</details>

<details><summary>Unverify a User</summary>

```
* Endpoint path: /api/users/user_id/unverify
* Endpoint method: PUT
* Query parameters:
  * user_id: user_id


* Headers:
  * Authorization: Bearer token


* Response: Unverified User
* Response shape (JSON):
    """
		{ 
		"id": number
		"first_name": string,
		"last_name": string,
		"username": string,
		"email": string,
		"address": string,
		"profile_pic": string,
		"sockstar_points": number (default = 0),
		"total_pairings": number (default = 0),
		"verified": bool,
		"type": str,
		"created_on": str
		}
    	"""
```

</details>

<details><summary>Update a User</summary>

```

* Endpoint path: /api/users/user_id
* Endpoint method: PUT
* Query parameters:
  * user_id: user_id


* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    """
		{ 
		"first_name": string,
		"last_name": string,
		"username": string,
		"password": string,
		"password_confirmation": string,
		"email": string,
		"address": string,
		"profile_pic": string,
		}
    	"""

* Response: Updated User
* Response shape (JSON):
    """
		{ 
		"id": number
		"first_name": string,
		"last_name": string,
		"username": string,
		"email": string,
		"address": string,
		"profile_pic": string,
		"sockstar_points": number (default = 0),
		"total_pairings": number (default = 0),
		"verified": bool,
		"type": str,
		"created_on": str
		}
    	"""
```

</details>

<details><summary>Get one User</summary>


```
* Endpoint path: /api/users/user_id
* Endpoint method: GET
* Query parameters:
  * user_id: user_id

* Headers:
  * Authorization: Bearer token

* Response: View User
* Response shape (JSON):
    """
		{ 
		"id": number
		"first_name": string,
		"last_name": string,
		"username": string,
		"email": string,
		"address": string,
		"profile_pic": string,
		"sockstar_points": number (default = 0),
		"total_pairings": number (default = 0),
		"verified": bool
		"created_on": str
		} ||
		{ 
		"id": number
		"username": string,
		"email": string,
		"profile_pic": string,
		"sockstar_points": number (default = 0),
		"total_pairings": number (default = 0),
		"created_on": str
		} 

    	"""
```

</details>

<details><summary>Get All Users</summary>

```
* Endpoint path: /api/users
* Endpoint method: GET


* Headers:
  * Authorization: Bearer token

* Response: View Users
* Response shape (JSON):
    """
		[
			{ 
				"id": number
				"first_name": string,
				"last_name": string,
				"username": string,
				"email": string,
				"address": string,
				"profile_pic": string,
				"sockstar_points": number (default = 0),
				"total_pairings": number (default = 0),
				"verified": bool,
				"type": str,
				"created_on": str
			}
		]
    	"""
```

</details>

<details><summary>Add SockStar Points</summary>

```
* Endpoint path: /api/users/user_id/sockstar
* Endpoint method: PUT
* Query parameters:
  * user_id: user_id
  * points: points value to update to


* Headers:
  * Authorization: Bearer token


* Response: Updated User 
* Response shape (JSON):
    """
		{ 
			"id": number
			"first_name": string,
			"last_name": string,
			"username": string,
			"email": string,
			"address": string,
			"profile_pic": string,
			"sockstar_points": number,
			"total_pairings": number,
			"verified": bool,
			"type": str,
			"created_on": str
		}
    	"""
```

</details>

<details><summary>Add Total Pairings</summary>

```
* Endpoint path: /api/users/user_id/matches
* Endpoint method: PUT
* Query parameters:
  * user_id: user_id
  * matchess: total pairings value to update to


* Headers:
  * Authorization: Bearer token


* Response: Updated User
* Response shape (JSON):
    """
		{ 
			"id": number
			"first_name": string,
			"last_name": string,
			"username": string,
			"email": string,
			"address": string,
			"profile_pic": string,
			"sockstar_points": number,
			"total_pairings": number,
			"verified": bool,
			"type": str,
			"created_on": str
		}
    	"""
```

</details>


## Verification Endpoints

<details><summary>Submit Verification</summary>


```
* Endpoint path: /api/verifications
* Endpoint method: POST


* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    """
		{ 
		"user_id": number,
		"license_url": string,
		"verification_status": string,
		}
    	"""

* Response: Submit Verificaiton
* Response shape (JSON):
    """
		{
			"id": number,
			"user_id": number,
			"license_url": string,
			"verification_status": string,
		}
    	"""
```

</details>

<details><summary>List Verifications</summary>

```
* Endpoint path: /api/verifications
* Endpoint method: GET



* Headers:
  * Authorization: Bearer token


* Response: Submit Verificaiton
* Response shape (JSON):
    """
		[
			{ 
				"id": number
				"user_id": number,
				"license_url": string,
				"verification_status": string,
			}
		]
    	"""
```

</details>

<details><summary>Approve Verificaiton</summary>

```
* Endpoint path: /api/verifications/id/approve
* Endpoint method: PUT
* query params: 
 * id: verificaiton id


* Headers:
  * Authorization: Bearer token


* Response: Updated Verification
* Response shape (JSON):
    """

		{ 
			"id": number
			"user_id": number,
			"license_url": string,
			"verification_status": string,
		}

    """
```
</details>

<details><summary>Reject Verificaiton</summary>

```
* Endpoint path: /api/verifications/id/reject
* Endpoint method: PUT
* query params: 
 * id: verificaiton id


* Headers:
  * Authorization: Bearer token


* Response: Updated Verification
* Response shape (JSON):
    """

		{ 
			"id": number
			"user_id": number,
			"license_url": string,
			"verification_status": string,
		}

    """
```
</details>

<details><summary>Delete Verificaiton</summary>

```
* Endpoint path: /api/verification/verification_id
* Endpoint method: DELETE
* Query parameters:
  * verification_id: verification_id


* Headers:
  * Authorization: Bearer token


* Response: Delete Verificaiton
* Response shape (JSON):
    """
		{ 
		"deleted": bool,
		}
    	"""
```
</details>

## Matches Endpoints

<details><summary>Create Match</summary>

```
* Endpoint path: /api/matches
* Endpoint method: POST
* Query parameters:
  * receive_sock: int - sock getting a match in the mail
  * gift_sock: int - sock being sent to another user
  * approving_id: int - id of the user who needs to approve the match

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    """
		{ 
			"gift_sock": dict,
			"receiving_sock": dict,
			"approving_user": int,
			"requesting_user": int,
			"match_status": bool,
		}
    	"""

* Response: Created Match
* Response shape (JSON):
	  """
		{ 
			"id": int
			"gift_sock": dict,
			"receiving_sock": dict,
			"approving_user": int,
			"requesting_user": int,
			"match_status": bool,
		}
    	"""
```

</details>

<details><summary>View Matches By User</summary>

```
* Endpoint path: /api/matches/users/user_id
* Endpoint method: GET
* Query parameters:
  * user_id: user_id

* Headers:
  * Authorization: Bearer token

* Response: Match
* Response shape (JSON):
	"""
		[
			{ 
			"id": int
			"gift_sock": dict,
			"receiving_sock": dict,
			"approving_user": int,
			"requesting_user": int,
			"match_status": bool,
			}
		]
    	"""
```

</details>

<details><summary>Delete Match</summary>

```
* Endpoint path: /api/matches/match_id
* Endpoint method: DELETE
* Query parameters:
  * match_id: match_id

* Headers:
  * Authorization: Bearer token


* Response: deletes a match
* Response shape (JSON):
    """
		{ 
		"deleted": bool,
		}
		"""
```

</details>

<details><summary>Approve Match</summary>

```
* Endpoint path: /api/matches/match_id
* Endpoint method: PUT
* Query parameters:
  * match_id: match_id

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    """
		{ 
			"gift_sock": dict,
			"receiving_sock": dict,
			"approving_user": int,
			"requesting_user": int,
			"match_status": bool,
		}
    	"""

* Response: Approved Match
* Response shape (JSON):
	"""
		{ 
			"id": int
			"gift_sock": dict,
			"receiving_sock": dict,
			"approving_user": int,
			"requesting_user": int,
			"match_status": bool,
		}
    """
```

</details>

<details><summary>Get One Match</summary>

```
* Endpoint path: /api/matches/match_id
* Endpoint method: GET
* Query parameters:
  * match_id: match_id

* Headers:
  * Authorization: Bearer token

* Response: Match
* Response shape (JSON):
	"""
		[
			{ 
			"id": int
			"gift_sock": dict,
			"receiving_sock": dict,
			"approving_user": int,
			"requesting_user": int,
			"match_status": bool,
			}
		]
```
</details>


## Email Endpoints

<details><summary>Email to Owner of Requested Sock</summary>

```
* Endpoint path: /api/email/request
* Endpoint method: POST
* Query parameters:
  * user_email: email of user_email
  * match_id: id of match created upon request

* Headers:
  * Authorization: Bearer token

* Response: Match
* Response shape (JSON):
	"""
		[
			{ 
			"message": "email has been sent"
			}
		]
    	"""
```

</details>

<details><summary>Email to Gift Owner Upon Approval</summary>

```
* Endpoint path: /api/email/gift
* Endpoint method: POST
* Query parameters:
  * user_email: email of user_email
  * username: username of the other user in the match
  * user_address: address of the user they're sending their sock to

* Headers:
  * Authorization: Bearer token

* Response: Match
* Response shape (JSON):
	"""
		[
			{ 
			"message": "email has been sent"
			}
		]
    	"""
```


</details>

<details><summary>Email to Receive Owner Upon Approval</summary>


```
* Endpoint path: /api/email/receive
* Endpoint method: POST
* Query parameters:
  * user_email: email of user_email
  * username: username of the other user in the match

* Headers:
  * Authorization: Bearer token

* Response: Match
* Response shape (JSON):
	"""
		[
			{ 
			"message": "email has been sent"
			}
		]
    	"""
```
</details>

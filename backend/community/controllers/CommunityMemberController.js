//? APIs to MongoDB

import { error, success } from '../../core/api/response.api.js'
import { ROLE } from '../../core/const.js'
import CommunityMember from '../models/CommunityMember.js'
import { userAddCommunity, userRemoveCommunity } from '../services/user.js'

async function getCommunityMemberList(request, response) {
  try {
    const { body } = request
    if (!body.communityId) {
      return error(response, 400, 'Community ID cannot be null')
    }
    const communityMembers = await CommunityMember.find({
      communityId: body.communityId,
    })

    return success(communityMembers, response, 200, 'Community Member List')
  } catch (error) {
    console.log('Error fetching Community Member List', error)
  }
  return null
}
async function updateCommunityMember(request, response) {
  try {
    const { communityId, uid, role } = request.body
    if (!communityId) {
      return error(response, 400, 'Community ID cannot be null')
    }
    const communityMember = await CommunityMember.findOne({
      communityId: communityId,
      uid,
    })
    if (!communityMember) {
      return error(response, 400, 'No Community Member Found!!')
    }
    const updatedCommunityMember = {
      ...communityMember,
      role,
    }
    await CommunityMember.updateOne(
      { communityId, uid },
      {
        $set: {
          ...updatedCommunityMember,
        },
        $currentDate: { lastUpdated: true },
      }
    )
    return success(
      updatedCommunityMember._doc,
      response,
      200,
      'Community Member Updated!!'
    )
  } catch (error) {
    response.status(500).json({ message: 'Something went wrong!!' })
  }
}

async function addCommunityMember(request, response) {
  try {
    const { communityId, uid, role } = request.body
    if (!communityId) {
      return error(response, 400, 'Community ID cannot be null')
    }
    const communityMember = await CommunityMember.findOne({
      communityId,
      uid,
    })
    if (communityMember) {
      return error(response, 403, 'Member Already Exist!!')
    }
    const newCommunityMember = new CommunityMember({
      communityId,
      uid,
      role: role || ROLE.COMMUNITY_MEMBER,
    })
    await newCommunityMember.save()
    // update user community list
    await userAddCommunity(communityId, uid)
    return success(
      newCommunityMember,
      response,
      200,
      'Community Member Added!!'
    )
  } catch (error) {
    console.log(error)
    return response.status(500).json({ message: 'Something went wrong!!' })
  }
}

async function deleteCommunityMember(request, response) {
  try {
    const { communityId, uid } = request.body
    if (!communityId) {
      return error(response, 400, 'Community ID cannot be null')
    }
    const communityMember = await CommunityMember.findOne({
      communityId,
      uid,
    })
    if (!communityMember) {
      return error(response, 403, "Member Doesn't Exist!!")
    }

    await CommunityMember.deleteOne({ communityId, uid })
    // update user community list
    await userRemoveCommunity(communityId, uid)
    return success({}, response, 200, 'Community Member Removed!!')
  } catch (error) {
    console.log(error)
    return response.status(500).json({ message: 'Something went wrong!!' })
  }
}

export {
  getCommunityMemberList,
  addCommunityMember,
  updateCommunityMember,
  deleteCommunityMember,
}

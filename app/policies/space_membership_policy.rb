# frozen_string_literal: true

class SpaceMembershipPolicy < ApplicationPolicy
  alias space_membership object
  delegate :space, to: :space_membership
  def create?
    person.operator? || person_responding_to_invitation_to_space?
  end

  private def person_responding_to_invitation_to_space?
    (space_membership.member.email == person.email && space.invitations.exists?(status: %i[sent pending], email: person.email))
  end
end
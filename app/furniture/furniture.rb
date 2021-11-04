# frozen_string_literal: true

# Groups the {Furniture} definitions and provides supporting functionality for
# folks defining new Furniture.
module Furniture
  REGISTRY = {
    breakout_tables_by_jitsi: BreakoutTablesByJitsi,
    check_dropbox: CheckDropbox,
    markdown_text_block: MarkdownTextBlock,
    videobridge_by_jitsi: VideobridgeByJitsi
  }.freeze

  # Appends each {Furniture}'s CRUD actions
  def self.append_routes(routing_context)
    REGISTRY.each_value do |furniture|
      furniture.append_routes(routing_context) if furniture.respond_to?(:append_routes)
    end
  end

  # @return [Placeable]
  def self.from_placement(placement)
    REGISTRY[placement.furniture_kind.to_sym].new(placement: placement)
  end

  def self.use_relative_model_naming?
    true
  end
end
# frozen_string_literal: true

# Renders some HTML in a {Room}.
class MarkdownTextBlock
  include Placeable
  include RendersMarkdown

  def to_html
    render_markdown(content)
  end

  def content=(content)
    settings["content"] = content
  end

  def content
    settings.fetch("content", "")
  end

  # @todo can we make it so we don't need to define this?
  # and the `settings.fetch` bits?
  def attribute_names
    super + ["content"]
  end

  # @deprecated
  def in_room_template
    "#{self.class.furniture_kind}/in_room"
  end
end
